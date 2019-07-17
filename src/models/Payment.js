import mongoose, { Schema } from 'mongoose';

export default mongoose.model('Payment', Schema({
  user: {
    trim: true,
    ref: 'User',
    maxlength: 100,
    type: Schema.Types.ObjectId,
  },
  type: {
    trim: true,
    type: String,
    default: 'Input',
    enum: ['Input', 'Output'],
  },
  from: {
    trim: true,
    type: String,
    maxlength: 200,
  },
  to: {
    trim: true,
    type: String,
    maxlength: 200,
  },
  address: {
    trim: true,
    ref: 'Address',
    type: Schema.Types.ObjectId,
  },
  tx: {
    trim: true,
    type: String,
    maxlength: 200,
  },
  amountZil: {
    trim: true,
    type: String,
    maxlength: 100,
  },
  amountUSD: {
    trim: true,
    type: String,
    maxlength: 100,
  },
  currency: {
    trim: true,
    type: String,
    enum: ['USD', 'ZIL'],
  },
  customerName: {
    trim: true,
    type: String,
    maxlength: 200,
  },
  customerEmail: {
    trim: true,
    type: String,
    maxlength: 300,
  },
  backURL: {
    trim: true,
    type: String,
    maxlength: 500,
  },
  status: {
    trim: true,
    type: String,
    enum: ['canceled', 'confirmed'],
  },
  confirmedAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
}));
