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
  photos: [{
    trim: true,
    type: String,
    maxlength: 150,
  }],
  address: {
    trim: true,
    type: String,
    required: false,
    maxlength: 250,
  },
  username: {
    trim: true,
    type: String,
    maxlength: 100,
    lowercase: true,
  },
  location: {
    lat: {
      trim: true,
      type: Number,
      maxlength: 30,
      required: false,
    },
    lng: {
      trim: true,
      type: Number,
      maxlength: 30,
      required: false,
    },
  },
  createdAt: {
    trim: true,
    type: Date,
    defaullt: Date.now,
  },
  description: {
    trim: true,
    type: String,
    maxlength: 500,
  },
  showcaseCount: {
    trim: true,
    default: 0,
    type: Number,
    required: true,
  },
  followersCount: {
    default: 0,
    trim: true,
    type: Number,
    required: true,
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
}, {
  usePushEach: true,
}));
