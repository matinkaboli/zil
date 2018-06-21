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
    required: true,
    maxlength: 500,
  },
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
}));
