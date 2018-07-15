import mongoose, { Schema } from 'mongoose';

export default mongoose.model('Shop', Schema({
  name: {
    trim: true,
    type: String,
    required: true,
    maxlength: 100,
  },
  admin: {
    trim: true,
    ref: 'User',
    required: true,
    type: Schema.Types.ObjectId,
  },
  phone: {
    trim: true,
    ref: 'User',
    required: true,
    type: Schema.Types.String,
  },
  photos: [{
    trim: true,
    type: String,
    maxlength: 150,
  }],
  address: {
    trim: true,
    type: String,
    required: true,
    maxlength: 250,
  },
  location: {
    lat: {
      trim: true,
      type: Number,
      maxlength: 30,
      required: true,
    },
    lng: {
      trim: true,
      type: Number,
      maxlength: 30,
      required: true,
    },
  },
  followers: [{
    trim: true,
    ref: 'User',
    type: Schema.Types.ObjectId,
  }],
  createdAt: {
    type: Date,
    required: true,
    defaullt: Date.now,
  },
  description: {
    trim: true,
    type: String,
    maxlength: 500,
  },
  minimumOrderPrice: {
    trim: true,
    type: Number,
    maxlength: 50,
    required: true,
  },
  maximumDeliveryTime: {
    trim: true,
    type: Number,
    maxlength: 5,
    required: true,
  },
}));
