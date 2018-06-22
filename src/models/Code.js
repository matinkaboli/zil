/*
 * Usage =
 *  Verifying user account (send code to user's email)
 */

import mongoose, { Schema } from 'mongoose';

export default mongoose.model('Code', Schema({
  code: {
    trim: true,
    type: String,
    required: true,
    maxlength: 300,
  },
  user: {
    trim: true,
    ref: 'User',
    required: true,
    type: Schema.Types.ObjectId,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    expires: 60 * 60 * 24,
  },
}));
