#!/bin/bash

git pull origin master
gulp prod
pm2 kill
cross-env NODE_ENV=development pm2 start build/app.js
echo "Done."
