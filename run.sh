#!/bin/bash

git pull origin master
gulp prod
pm2 kill
pm2 start build/app.js
echo "Done."
