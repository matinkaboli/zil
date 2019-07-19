module.exports = {
  apps: [
    {
      name: 'zil',
      watch: true,
      script: './build/app.js',
      env: {
        PORT: '8080',
        NODE_ENV: 'development',
      },
      // env_production: {
      //   PORT: '80',
      //   NODE_ENV: 'production',
      // },
    },
  ],
};
