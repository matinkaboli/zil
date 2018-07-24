import mongoose, { Schema } from 'mongoose';

export default mongoose.model('User', Schema({
  name: {
    trim: true,
    type: String,
    maxlength: 100,
  },
  phone: {
    trim: true,
    type: String,
    maxlength: 10,
    required: true,
  },
  shops: [{
    trim: true,
    ref: 'Shop',
    type: Schema.Types.ObjectId,
  }],
  score: {
    trim: true,
    default: 10,
    type: Number,
    required: true,
  },
  verified: {
    trim: true,
    type: Boolean,
    required: true,
    default: false,
  },
  role: {
    trim: true,
    default: 0,
    type: Number,
    enum: [0, 1],
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
}));
