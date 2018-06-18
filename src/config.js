export default {
  port: '8080',
  db: process.env.DB || 'mongodb://localhost/hyper',
  sessionKey: process.env.SECRET_KEY || 'QIFE564%?sKb]JTqeN0Az.9vH4ahjM1l~',
  hashKey: process.env.HASH_KEY || '*wtt_a4pv[ZZSd,+8C8V',
};
