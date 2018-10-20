import { resolve } from 'path';

export default {
  sms: {
    template: process.env.SMS_TEMPLATE || 'hyper',
    apiKey: process.env.SMS_API_KEY || '345271454776727A622B384B53382B323356507233673D3D',
  },
  pushe: {
    app: process.env.PUSHE_APP || 'com.hyper.app',
    url: process.env.PUSHE_URL || 'https://panel.pushe.co/api/v1/notifications',
    token: process.env.PUSHE_TOKEN || '3352a7548b52f29b0bb3f46c37a75369fbf15165',
  },
  port: process.env.PORT || '8080',
  dbAddress: process.env.DB || 'mongodb://0.0.0.0/hyper',
  hashKey: process.env.HASH_KEY || '*wtt_a4pv[ZZSd,+8C8V',
  jwtKey: process.env.JWT_KEY || 'wdZ7:!RKkYB+g^Jnq-)Gb>9%QM',
  uploadDir: process.env.UPLOAD_DIR || resolve(__dirname, 'static/uploads'),
  otpSecret: process.env.OTP_SECRET || 'X)npM&[E.fMATINKABOLI+ADaf^W/N!N6K!',
};
