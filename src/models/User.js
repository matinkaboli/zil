import mongoose, { Schema } from 'mongoose';

export default mongoose.model('User', Schema({
  name: {
    trim: true,
    type: String,
    maxlength: 100,
  },
  role: {
    trim: true,
    default: 0,
    type: Number,
    enum: [0, 1],
    required: true,
  },
  phone: {
    trim: true,
    type: String,
    maxlength: 10,
    required: true,
  },
  score: {
    trim: true,
    default: 10,
    type: Number,
    required: true,
  },
  pusheId: {
    trim: true,
    type: String,
    maxlength: 50,
    required: true,
  },
  password: {
    trim: true,
    type: String,
    maxlength: 200,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  passwordHint: {
    trim: true,
    type: String,
    maxlength: 50,
  },
}));
