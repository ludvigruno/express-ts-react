import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';

import express, { NextFunction, Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import 'express-async-errors';

import apiRouter from './routes/api';
import logger from 'jet-logger';
import { CustomError } from '@shared/errors';

import cors from 'cors';

import 'reflect-metadata';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'type-graphql';
import { UsersResolver } from './graphql/resolvers/users';

import dotenv from 'dotenv';

// Constants
const app = express();

//variable environment
dotenv.config();

/***********************************************************************************
 *                                  Middlewares
 **********************************************************************************/

// Common middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  cors({
    origin: ['http://localhost:3001', 'http://localhost:3002'],
    credentials: true,
  }),
);

// Creating a Schema for GraphQL
const schema = async () => {
  const schema: any = await buildSchema({
    resolvers: [UsersResolver],
    emitSchemaFile: true,
    validate: false,
  });
  app.use(
    '/graphql',
    graphqlHTTP({
      schema,
      graphiql: true,
    }),
  );
};

schema();

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Security (helmet recommended in express docs)
if (process.env.NODE_ENV === 'production') {
  app.use(helmet());
}

/***********************************************************************************
 *                         API routes and error handling
 **********************************************************************************/

// Add api router
app.use('/', apiRouter);

app.use(
  (err: Error | CustomError, _: Request, res: Response, __: NextFunction) => {
    logger.err(err, true);
    const status =
      err instanceof CustomError ? err.HttpStatus : StatusCodes.ACCEPTED;
    return res.status(status).json({
      error: err.message,
    });
  },
);

// Export here and start in a diff file (for testing).
export default app;
