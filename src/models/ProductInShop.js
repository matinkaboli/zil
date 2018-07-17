import mongoose, { Schema } from 'mongoose';

export default mongoose.model('ProductInShop', Schema({
  shop: {
    trim: true,
    ref: 'Shop',
    required: true,
    type: Schema.Types.ObjectId,
  },
  price: {
    trim: true,
    type: Number,
    maxlength: 30,
    required: true,
  },
  product: {
    trim: true,
    ref: 'Product',
    required: true,
    type: Schema.Types.ObjectId,
  },
  createdAt: {
    trim: true,
    type: Date,
    required: true,
    default: Date.now,
  },
  discountedPrice: {
    trim: true,
    type: Number,
    maxlength: 30,
  },
}));
