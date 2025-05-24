import { Router, Response, NextFunction } from 'express';
import { protect } from '../middleware/auth';
import Memory from '../models/Memory';
import { ErrorResponse } from '../utils/errorResponse';

const router = Router();

// @desc    Get all memories for the authenticated user
// @route   GET /api/memories
// @access  Private
router.get('/', protect, async (req: any, res: Response, next: NextFunction) => {
  try {
    const memories = await Memory.find({ user: req.user.id }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: memories.length,
      data: memories
    });
  } catch (err) {
    next(err);
  }
});

// @desc    Get single memory
// @route   GET /api/memories/:id
// @access  Private
router.get('/:id', protect, async (req: any, res: Response, next: NextFunction) => {
  try {
    const memory = await Memory.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!memory) {
      return next(
        new ErrorResponse(`Memory not found with id of ${req.params.id}`, 404)
      );
    }

    res.status(200).json({
      success: true,
      data: memory
    });
  } catch (err) {
    next(err);
  }
});

// @desc    Create new memory
// @route   POST /api/memories
// @access  Private
router.post('/', protect, async (req: any, res: Response, next: NextFunction) => {
  try {
    // Add user to req.body
    req.body.user = req.user.id;

    const memory = await Memory.create(req.body);

    res.status(201).json({
      success: true,
      data: memory
    });
  } catch (err) {
    next(err);
  }
});

// @desc    Update memory
// @route   PUT /api/memories/:id
// @access  Private
router.put('/:id', protect, async (req: any, res: Response, next: NextFunction) => {
  try {
    let memory = await Memory.findById(req.params.id);

    if (!memory) {
      return next(
        new ErrorResponse(`Memory not found with id of ${req.params.id}`, 404)
      );
    }

    // Make sure user owns the memory
    if (memory.user.toString() !== req.user.id) {
      return next(
        new ErrorResponse('Not authorized to update this memory', 401)
      );
    }

    memory = await Memory.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: memory
    });
  } catch (err) {
    next(err);
  }
});

// @desc    Delete memory
// @route   DELETE /api/memories/:id
// @access  Private
router.delete('/:id', protect, async (req: any, res: Response, next: NextFunction) => {
  try {
    const memory = await Memory.findById(req.params.id);

    if (!memory) {
      return next(
        new ErrorResponse(`Memory not found with id of ${req.params.id}`, 404)
      );
    }

    // Make sure user owns the memory
    if (memory.user.toString() !== req.user.id) {
      return next(
        new ErrorResponse('Not authorized to delete this memory', 401)
      );
    }

    await Memory.deleteOne({ _id: req.params.id });

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
});

export default router;
