FROM node:8-alpine

WORKDIR /app

COPY package.json package-lock.json gulpfile.js /app/

RUN npm install

COPY src /app/src
COPY webpack /app/webpack

RUN npm run prod

ENV NODE_ENV=production

EXPOSE 8080

CMD ["node", "build/app.js"]