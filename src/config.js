export default {
  port: process.env.PORT || '8080',
  hashKey: 'bloo',
  dbAddress: process.env.DB || 'mongodb://127.0.0.1/zil',
  jwtKey: process.env.JWT_KEY || 'wdZ7:!RKkYB+g^Jnq-)Gb>9%QM',
};
