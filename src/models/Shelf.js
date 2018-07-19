import mongoose, { Schema } from 'mongoose';

export default mongoose.model('Shelf', Schema({
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
  verified: {
    trim: true,
    type: Boolean,
    default: false,
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
}));
