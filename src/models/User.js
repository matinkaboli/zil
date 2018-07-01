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
  verified: {
    trim: true,
    type: Boolean,
    required: true,
    default: false,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
}));
