import mongoose, { Schema } from 'mongoose';

export default mongoose.model('User', Schema({
  name: {
    trim: true,
    type: String,
    maxlength: 100,
  },
  email: {
    trim: true,
    type: String,
    unique: true,
    maxlength: 150,
    required: true,
    lowercase: true,
  },
  apiKey: {
    trim: true,
    type: String,
    unique: true,
    maxlength: 200,
    required: true,
  },
  balance: {
    trim: true,
    type: String,
    default: '0',
    maxlength: 100,
  },
  password: {
    trim: true,
    type: String,
    maxlength: 200,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
}));
