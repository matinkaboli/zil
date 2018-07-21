import mongoose, { Schema } from 'mongoose';

export default mongoose.model('Attempt', Schema({
  user: {
    trim: true,
    ref: 'User',
    required: true,
    type: Schema.Types.ObjectId,
  },
  attempts: {
    trim: true,
    default: 0,
    type: Number,
    required: true,
  },
  createdAt: {
    trim: true,
    type: Date,
    required: true,
    expires: 60 * 30,
    default: Date.now,
  },
}));
