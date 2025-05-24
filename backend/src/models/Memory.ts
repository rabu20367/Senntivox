import mongoose, { Document, Schema } from 'mongoose';

export interface IMemory extends Document {
  user: mongoose.Schema.Types.ObjectId;
  title: string;
  content: string;
  isImportant: boolean;
  tags: string[];
  relatedConversations: mongoose.Schema.Types.ObjectId[];
  lastAccessed: Date;
  accessCount: number;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const MemorySchema = new Schema<IMemory>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    content: {
      type: String,
      required: true
    },
    isImportant: {
      type: Boolean,
      default: false
    },
    tags: [
      {
        type: String,
        trim: true
      }
    ],
    relatedConversations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation'
      }
    ],
    lastAccessed: {
      type: Date,
      default: Date.now
    },
    accessCount: {
      type: Number,
      default: 0
    },
    isArchived: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

// Create text index for search functionality
MemorySchema.index(
  { title: 'text', content: 'text', tags: 'text' },
  { weights: { title: 3, content: 2, tags: 1 } }
);

// Add a pre-save hook to update lastAccessed and accessCount
MemorySchema.pre<IMemory>('save', function (next) {
  if (this.isModified('lastAccessed')) {
    this.accessCount += 1;
  }
  next();
});

const Memory = mongoose.model<IMemory>('Memory', MemorySchema);

export default Memory;
