import { resolve } from 'path';

export default {
  sms: {
    apiKey: '345271454776727A622B384B53382B323356507233673D3D',
    messageTemplate: '%DA%A9%D8%AF%20%D9%81%D8%B9%D8%A7%D9%84%D8%B3%D8%A7%D8%B2%DB%8C%20%D9%87%D8%A7%DB%8C%D9%BE%D8%B1%3A%20',
  },
  port: process.env.PORT || '8080',
  uploadDir: resolve(__dirname, 'static/uploads'),
  dbAddress: process.env.DB || 'mongodb://0.0.0.0/hyper',
  hashKey: process.env.HASH_KEY || '*wtt_a4pv[ZZSd,+8C8V',
  jwtKey: process.env.JWT_KEY || 'wdZ7:!RKkYB+g^Jnq-)Gb>9%QM',
};
