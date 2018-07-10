import { resolve } from 'path';

export default {
  port: process.env.PORT || '8080',
  uploadDir: resolve(__dirname, 'static/uploads'),
  dbAddress: process.env.DB || 'mongodb://0.0.0.0/hyper',
  hashKey: process.env.HASH_KEY || '*wtt_a4pv[ZZSd,+8C8V',
};
