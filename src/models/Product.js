import mongoose, { Schema } from 'mongoose';

export default mongoose.model('Product', Schema({
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
  photos: [{
    trim: true,
    type: String,
    maxlength: 150,
  }],
  expiration: {
    type: String,
    maxlength: 100,
  },
}));
