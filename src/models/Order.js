import mongoose, { Schema } from 'mongoose';

export default mongoose.model('Order', Schema({
  shop: {
    trim: true,
    ref: 'Shop',
    required: true,
    type: Schema.Types.ObjectId,
  },
  user: {
    trim: true,
    ref: 'User',
    required: true,
    type: Schema.Types.ObjectId,
  },
  createdAt: {
    trim: true,
    type: Date,
    required: true,
    default: Date.now,
  },
}));
