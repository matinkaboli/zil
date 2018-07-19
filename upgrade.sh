#!/bin/bash

git pull origin master
npm install
gulp prod
rm -rf node_modules
npm install --production
pm2 kill
pm2 start build/app.js
echo "Done."
