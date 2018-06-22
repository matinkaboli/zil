import mongoose, { Schema } from 'mongoose';

export default mongoose.model('User', Schema({
  phone: {
    trim: true,
    type: String,
    maxlength: 10,
    required: true,
  },
  verified: {
    trim: true,
    type: Boolean,
    required: true,
    default: false,
  },
  shops: [{
    trim: true,
    ref: 'Shop',
    type: Schema.Types.ObjectId,
  }],
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
}));
