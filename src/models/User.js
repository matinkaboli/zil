import mongoose from 'mongoose';

import email from 'Root/utils/validate/email';

export default mongoose.model('User', mongoose.Schema({
  name: {
    trim: true,
    type: String,
    required: true,
    maxlength: 100,
  },
  email: {
    trim: true,
    unique: true,
    type: String,
    required: true,
    maxlength: 200,
    lowercase: true,
    validate: {
      validator(v) {
        return email(v);
      },
      message: 'email is invalid',
    },
  },
  password: {
    trim: true,
    type: String,
    required: true,
    maxlength: 300,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  verified: {
    trim: true,
    type: Boolean,
    required: true,
    default: false,
  },
}));
