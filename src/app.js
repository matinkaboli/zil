import 'babel-polyfill';
import { join } from 'path';
import morgan from 'morgan';
import helmet from 'helmet';
import process from 'process';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import compression from 'compression';
import graphql from 'express-graphql';
import graphqlDepthLimit from 'graphql-depth-limit';

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

// Gzip Compression
app.use(compression());

// Helmet
app.use(helmet());

// Static Files
app.use('/static', express.static(join(__dirname, './static')));

// Logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('short'));
}

// Body Parser
app.use(bodyParser.json({ limit: 10000000 }));
app.use(bodyParser.urlencoded({ extended: false }));

// GraphQL API
app.use('/graphql', (req, res) =>
  graphql({
    schema,
    context: { req, res },
    validationRules: [graphqlDepthLimit(5)],
    graphiql: process.env.NODE_ENV === 'development',
  })(req, res));

// REST API
for (const router of routers) {
  app.use(router);
}

// 404 Not Found
app.use((req, res) => {
  res.status(404).send();
});

// Handle Error
app.use((error, req, res, next) => res.status(500).json({
  error: error.message,
}));

// Port
app.listen(port);
