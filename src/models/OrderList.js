import mongoose, { Schema } from 'mongoose';

export default mongoose.model('OrderList', Schema({
  order: {
    trim: true,
    ref: 'Order',
    required: true,
    type: Schema.Types.ObjectId,
  },
  count: {
    default: 1,
    trim: true,
    type: Number,
    required: true,
  },
  price: {
    trim: true,
    type: Number,
    required: true,
  },
  showcase: {
    trim: true,
    required: true,
    ref: 'Showcase',
    type: Schema.Types.ObjectId,
  },
}));
