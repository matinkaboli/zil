import mongoose, { Schema } from 'mongoose';

export default mongoose.model('Product', Schema({
  name: {
    trim: true,
    type: String,
    required: true,
    maxlength: 100,
  },
  weight: {
    trim: true,
    type: String,
    required: true,
    maxlength: 100,
  },
  isbn: {
    trim: true,
    type: String,
    required: true,
    maxlength: 50,
  },
  price: {
    trim: true,
    type: Number,
    required: true,
    maxlength: 30,
  },
  off: {
    trim: true,
    default: 0,
    type: Number,
    required: true,
  },
  photos: [{
    trim: true,
    type: String,
    maxlength: 150,
  }],
  shop: {
    ref: 'Shop',
    required: true,
    type: Schema.Types.ObjectId,
  },
  expiration: {
    type: String,
    maxlength: 100,
    required: true,
  },
}));
