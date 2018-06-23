import mongoose, { Schema } from 'mongoose';

export default mongoose.model('Code', Schema({
  user: {
    trim: true,
    ref: 'User',
    required: true,
    type: Schema.Types.ObjectId,
  },
  code: {
    trim: true,
    type: String,
    maxlength: 10,
    required: true,
  },
  createdAt: {
    trim: true,
    type: Date,
    required: true,
    default: Date.now,
    expires: 60 * 60 * 24,
  },
}));
