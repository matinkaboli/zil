import mongoose, { Schema } from 'mongoose';

export default mongoose.model('Shop', Schema({
  name: {
    trim: true,
    type: String,
    required: true,
    maxlength: 100,
  },
  description: {
    trim: true,
    type: String,
    maxlength: 500,
  },
  address: {
    type: String,
    required: true,
    maxlength: 250,
  },
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
  avatar: {
    trim: true,
    type: String,
    maxlength: 150,
  },
  photos: [{
    trim: true,
    type: String,
    maxlength: 150,
  }],
  admin: {
    ref: 'User',
    required: true,
    type: Schema.Types.ObjectId,
  },
  createdAt: {
    type: Date,
    required: true,
    defaullt: Date.now,
  },
}));
