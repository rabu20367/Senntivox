import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: Date;
}

export interface IConversation extends Document {
  user: mongoose.Schema.Types.ObjectId;
  title: string;
  messages: IMessage[];
  isArchived: boolean;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>({
  role: {
    type: String,
    enum: ['user', 'assistant', 'system'],
    required: true
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const ConversationSchema = new Schema<IConversation>(
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
    messages: [MessageSchema],
    isArchived: {
      type: Boolean,
      default: false
    },
    tags: [
      {
        type: String,
        trim: true
      }
    ]
  },
  {
    timestamps: true
  }
);

// Create text index for search functionality
ConversationSchema.index(
  { title: 'text', 'messages.content': 'text', tags: 'text' },
  { weights: { title: 3, 'messages.content': 2, tags: 1 } }
);

// Add a pre-save hook to ensure there's always a title
ConversationSchema.pre<IConversation>('save', function (next) {
  if (this.isNew && this.messages.length > 0 && !this.title) {
    // Set title from the first message if not provided
    const firstMessage = this.messages[0].content;
    this.title = firstMessage.substring(0, 50) + (firstMessage.length > 50 ? '...' : '');
  }
  next();
});

const Conversation = mongoose.model<IConversation>('Conversation', ConversationSchema);

export default Conversation;
