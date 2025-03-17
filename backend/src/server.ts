import morgan from 'morgan';
import helmet from 'helmet';
import logger from 'jet-logger';
import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';

import {morganLog, requestID} from './middlewares';
import {apiRouter} from './routes';

import {createConnection} from 'typeorm';
import * as Entities from './entities';
import { connectDbConfig } from './configs';

config();

const app = express();

/***********************************************************************************
 *                                  Middleware
 **********************************************************************************/

// Common middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
// Request id
app.use(requestID());

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Security (helmet recommended in express docs)
if (process.env.NODE_ENV === 'production') {
  morganLog(app);
  app.use(helmet());
}

// DB connection
(async () => {
  try {
    await createConnection(connectDbConfig(Object.values(Entities)));
    logger.info('Connect DB successfully');
  } catch (err) {
    logger.err(err);
    throw err;
  }
})();

/***********************************************************************************
 *                         API routes and error handling
 **********************************************************************************/

app.use('/api', apiRouter);

export default app;
