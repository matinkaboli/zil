FROM node:8-alpine

ENV TZ=Asia/Tehran \
  BABEL_DISABLE_CACHE=1

RUN apk update && \
  apk add tzdata curl bash ca-certificates rsync supervisor nginx \
    python python-dev py-pip build-base libpng-dev autoconf automake nasm libtool && \
  cp /usr/share/zoneinfo/${TZ} /etc/localtime && \
  echo "${TZ}" > /etc/timezone && \
  sed -i "/user nginx;/c #user nginx;" /etc/nginx/nginx.conf && \
  mkdir -p /usr/src/app /.config /run/nginx /var/lib/nginx/logs && \
  chgrp -R 0        /var/log /var/run /var/tmp /run/nginx /var/lib/nginx && \
  chmod -R g=u,a+rx /var/log /var/run /var/tmp /run/nginx /var/lib/nginx && \
  ln -sf /dev/stdout /var/log/nginx/access.log && \
  ln -sf /dev/stderr /var/log/nginx/error.log && \
  rm -rf /var/cache/apk/*

EXPOSE 8080

WORKDIR /usr/src/app

COPY supervisord.conf /
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY package.json ./

RUN npm install

COPY . /tmp/app
RUN chgrp -R 0 /tmp/app /.config && \
  chmod -R g=u /tmp/app /.config && \
  cp -a /tmp/app/. /usr/src/app && \
  rm -rf /tmp/app && \
  chmod +x start.sh

CMD ["./start"]

USER 1001