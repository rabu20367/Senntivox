import { Router, Response, NextFunction } from 'express';
import { protect } from '../middleware/auth';
import Conversation from '../models/Conversation';
import { ErrorResponse } from '../utils/errorResponse';

const router = Router();

// @desc    Get all conversations for the authenticated user
// @route   GET /api/conversations
// @access  Private
router.get('/', protect, async (req: any, res: Response, next: NextFunction) => {
  try {
    const conversations = await Conversation.find({ user: req.user.id })
      .sort({ updatedAt: -1 });
    
    res.status(200).json({
      success: true,
      count: conversations.length,
      data: conversations
    });
  } catch (err) {
    next(err);
  }
});

// @desc    Get single conversation
// @route   GET /api/conversations/:id
// @access  Private
router.get('/:id', protect, async (req: any, res: Response, next: NextFunction) => {
  try {
    const conversation = await Conversation.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!conversation) {
      return next(
        new ErrorResponse(`Conversation not found with id of ${req.params.id}`, 404)
      );
    }

    res.status(200).json({
      success: true,
      data: conversation
    });
  } catch (err) {
    next(err);
  }
});

// @desc    Create new conversation
// @route   POST /api/conversations
// @access  Private
router.post('/', protect, async (req: any, res: Response, next: NextFunction) => {
  try {
    // Add user to req.body
    req.body.user = req.user.id;

    const conversation = await Conversation.create(req.body);

    res.status(201).json({
      success: true,
      data: conversation
    });
  } catch (err) {
    next(err);
  }
});

// @desc    Update conversation
// @route   PUT /api/conversations/:id
// @access  Private
router.put('/:id', protect, async (req: any, res: Response, next: NextFunction) => {
  try {
    let conversation = await Conversation.findById(req.params.id);

    if (!conversation) {
      return next(
        new ErrorResponse(`Conversation not found with id of ${req.params.id}`, 404)
      );
    }

    // Make sure user owns the conversation
    if (conversation.user.toString() !== req.user.id) {
      return next(
        new ErrorResponse('Not authorized to update this conversation', 401)
      );
    }

    conversation = await Conversation.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: conversation
    });
  } catch (err) {
    next(err);
  }
});

// @desc    Delete conversation
// @route   DELETE /api/conversations/:id
// @access  Private
router.delete('/:id', protect, async (req: any, res: Response, next: NextFunction) => {
  try {
    const conversation = await Conversation.findById(req.params.id);

    if (!conversation) {
      return next(
        new ErrorResponse(`Conversation not found with id of ${req.params.id}`, 404)
      );
    }

    // Make sure user owns the conversation
    if (conversation.user.toString() !== req.user.id) {
      return next(
        new ErrorResponse('Not authorized to delete this conversation', 401)
      );
    }

    await Conversation.deleteOne({ _id: req.params.id });

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
});

export default router;
