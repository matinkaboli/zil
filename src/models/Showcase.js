import mongoose, { Schema } from 'mongoose';

export default mongoose.model('Showcase', Schema({
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
  shelf: {
    name: {
      trim: true,
      type: String,
      required: true,
      maxlength: 100,
    },
    isbn: {
      trim: true,
      type: String,
      maxlength: 50,
    },
    photo: {
      trim: true,
      type: String,
      maxlength: 150,
    },
    expiration: {
      trim: true,
      type: String,
      maxlength: 100,
    },
    description: {
      trim: true,
      type: String,
      maxlength: 200,
    },
    manufacturer: {
      trim: true,
      type: String,
      maxlength: 150,
    },
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
