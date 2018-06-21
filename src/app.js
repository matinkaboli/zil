import 'babel-polyfill';
import morgan from 'morgan';
import process from 'process';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import graphql from 'express-graphql';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import connectMongo from 'connect-mongo';

import schema from './graphql';
import routers from './routers';
import { sessionKey, port, db } from './config';


// DB
mongoose.Promise = global.Promise;

mongoose.connect(db);

mongoose.connection.on('error', () => {
  process.exit(1);
});

mongoose.connection.on('disconnected', () => {
  process.exit(1);
});

const app = express();

// Logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('short'));
}

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: 10000000 }));


// Cookie Parser
app.use(cookieParser());

// Session
const MongoStore = connectMongo(session);

app.use(session({
  secret: sessionKey,
  resave: true,
  cookie: {
    maxAge: 60 * 60 * 1000 * 24,
  },
  saveUninitialized: false,
  store: new MongoStore({
    url: process.env.DB || db,
  }),
}));

// GraphQL API
app.use('/graphql', (req, res) =>
  graphql({
    schema,
    graphiql: true,
    context: { req, res },
  })(req, res));

// REST API
for (const router of routers) {
  app.use(router);
}

// Port
app.listen(port, () => {
  console.log('The server is running!!!');
});
