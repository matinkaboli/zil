import { resolve } from 'path';

export default {
  sms: {
    apiKey: process.env.SMS_API_KEY || '345271454776727A622B384B53382B323356507233673D3D',
    template: process.env.SMS_TEMPLATE || 'Hyper',
  },
  port: process.env.PORT || '8080',
  uploadDir: resolve(__dirname, 'static/uploads'),
  dbAddress: process.env.DB || 'mongodb://0.0.0.0/hyper',
  hashKey: process.env.HASH_KEY || '*wtt_a4pv[ZZSd,+8C8V',
  jwtKey: process.env.JWT_KEY || 'wdZ7:!RKkYB+g^Jnq-)Gb>9%QM',
  otpSecret: process.env.OTP_SECRET || 'X)npM&[E.fMATINKABOLI+ADaf^W/N!N6K!',
};
