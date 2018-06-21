FROM node:8-alpine

WORKDIR /app

COPY package.json package-lock.json /app/

RUN npm i

COPY src /app/src
COPY webpack /app/webpack

RUN npm run build && rm -rf /app/src /app/node_modules

ENV NODE_ENV=production

RUN npm i --production

COPY build /app/build

EXPOSE 8080

CMD ["node", "build/app.js"]