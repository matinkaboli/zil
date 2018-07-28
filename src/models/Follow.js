import mongoose, { Schema } from 'mongoose';

export default mongoose.model('Follow', Schema({
  user: {
    trim: true,
    ref: 'User',
    required: true,
    type: Schema.Types.ObjectId,
  },
  shop: {
    trim: true,
    ref: 'Shop',
    required: true,
    type: Schema.Types.ObjectId,
  },
}));
