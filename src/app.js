import 'babel-polyfill';
import { join } from 'path';
import morgan from 'morgan';
import process from 'process';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import graphql from 'express-graphql';

import schema from './graphql';
import routers from './routers';
import { port, dbAddress } from './config';

// DB
mongoose.Promise = global.Promise;

mongoose.connect(dbAddress);

mongoose.connection.on('error', () => {
  process.exit(1);
});

mongoose.connection.on('disconnected', () => {
  process.exit(1);
});

const app = express();

// Static Files
app.use('/static', express.static(join(__dirname, './static')));

// Logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('short'));
}

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: 10000000 }));


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
app.listen(port);
