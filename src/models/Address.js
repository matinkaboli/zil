import mongoose, { Schema } from 'mongoose';

export default mongoose.model('Address', Schema({
  address: {
    trim: true,
    type: String,
    maxlength: 300,
    required: true,
  },
  status: {
    type: String,
    maxlength: 20,
    required: true,
    enum: ['Taken', 'Free'],
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
}));
