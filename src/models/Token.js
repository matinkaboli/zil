import mongoose, { Schema } from 'mongoose';

export default mongoose.model('Token', Schema({
  user: {
    trim: true,
    ref: 'User',
    unique: true,
    required: true,
    type: Schema.Types.ObjectId,
  },
  token: {
    trim: true,
    unique: true,
    type: String,
    required: true,
    maxlength: 400,
  },
}));
