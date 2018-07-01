import mongoose, { Schema } from 'mongoose';

export default mongoose.model('Shop', Schema({
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
  name: {
    trim: true,
    type: String,
    required: true,
    maxlength: 100,
  },
  admin: {
    ref: 'User',
    required: true,
    type: Schema.Types.ObjectId,
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
  address: {
    type: String,
    required: true,
    maxlength: 250,
  },
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
}));
