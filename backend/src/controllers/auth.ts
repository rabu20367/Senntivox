import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import User from '../models/User';
import ErrorResponse from '../utils/errorResponse';
import { sendSimpleEmail } from '../utils/sendEmail';
import { IUserRequest } from '../types/express';

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password, role } = req.body;

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role
    });

    // Return 201 status code to indicate successful creation
    sendTokenResponse(user, 201, res);
  } catch (err) {
    next(err);
  }
};

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return next(new ErrorResponse('Please provide an email and password', 400));
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }

    sendTokenResponse(user, 200, res);
  } catch (err) {
    next(err);
  }
};

// @desc    Get current logged in user
// @route   GET /api/v1/auth/me
// @access  Private
export const getMe = async (req: IUserRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return next(new ErrorResponse('Not authorized to access this route', 401));
    }
    
    const user = await User.findById(req.user._id);

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Forgot password
// @route   POST /api/v1/auth/forgotpassword
// @access  Public
export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return next(new ErrorResponse('There is no user with that email', 404));
    }

    // Get reset token
    const resetToken = (user as any).getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    // Create reset url
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/resetpassword/${resetToken}`;

    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

    try {
      await sendSimpleEmail(
        user.email,
        'Password reset token',
        message
      );

      res.status(200).json({ success: true, data: 'Email sent' });
    } catch (err) {
      console.error(err);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save({ validateBeforeSave: false });

      return next(new ErrorResponse('Email could not be sent', 500));
    }
  } catch (err) {
    next(err);
  }
};

// @desc    Reset password
// @route   PUT /api/v1/auth/resetpassword/:resettoken
// @access  Public
export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get hashed token
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.resettoken)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return next(new ErrorResponse('Invalid token', 400));
    }

    // Set new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    sendTokenResponse(user, 200, res);
  } catch (err) {
    next(err);
  }
};

// @desc    Update user details
// @route   PUT /api/v1/auth/updatedetails
// @access  Private
export const updateDetails = async (req: IUserRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return next(new ErrorResponse('Not authorized to access this route', 401));
    }

    const fieldsToUpdate = {
      name: req.body.name,
      email: req.body.email
    };

    const user = await User.findByIdAndUpdate(req.user._id, fieldsToUpdate, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update password
// @route   PUT /api/v1/auth/updatepassword
// @access  Private
export const updatePassword = async (req: IUserRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return next(new ErrorResponse('Not authorized to access this route', 401));
    }

    const user = await User.findById(req.user._id).select('+password');

    if (!user) {
      return next(new ErrorResponse('User not found', 404));
    }

    // Check current password
    const { currentPassword, newPassword } = req.body;
    
    if (!currentPassword || !newPassword) {
      return next(new ErrorResponse('Please provide both current and new password', 400));
    }

    if (typeof currentPassword !== 'string' || typeof newPassword !== 'string') {
      return next(new ErrorResponse('Invalid password format', 400));
    }

    if (!(await user.matchPassword(currentPassword))) {
      return next(new ErrorResponse('Password is incorrect', 401));
    }

    user.password = newPassword;
    await user.save();

    sendTokenResponse(user, 200, res);
  } catch (err) {
    next(err);
  }
};

// @desc    Log user out / clear cookie
// @route   GET /api/v1/auth/logout
// @access  Private
export const logout = (_req: Request, res: Response) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    data: {}
  });
};

// Get token from model, create cookie and send response
const sendTokenResponse = (user: any, statusCode: number, res: Response) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + (process.env.JWT_COOKIE_EXPIRE ? parseInt(process.env.JWT_COOKIE_EXPIRE) * 24 * 60 * 60 * 1000 : 30 * 24 * 60 * 60 * 1000)
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  };

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token
    });
};

export default {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
  updateDetails,
  updatePassword,
  logout
};
