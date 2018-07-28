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
  delivery: {
    lat: {
      trim: true,
      type: Number,
      required: true,
    },
    lng: {
      trim: true,
      type: Number,
      required: true,
    },
    address: {
      trim: true,
      type: String,
      required: true,
    },
    time: {
      trim: true,
      type: String,
      required: true,
    },
  },
  createdAt: {
    trim: true,
    type: Date,
    required: true,
    default: Date.now,
  },
}));
