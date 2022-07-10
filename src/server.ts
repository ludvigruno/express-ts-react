import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import morgan from 'morgan';
import helmet from 'helmet';

// import logger from 'jet-logger';
// import { graphqlHTTP } from 'express-graphql';
// import { buildSchema } from 'type-graphql';

import 'express-async-errors';
import 'reflect-metadata';

import { errorMiddleware } from './middlewares/error-middleware';
import router from './routes/api-base';

// import { UsersResolver } from './graphql/resolvers/users';

//variable environment
dotenv.config();

// Constants
const app = express();

console.log(process.env?.NODE_ENV);
console.log(process.env['NODE_ENV']);
/***********************************************************************************
 *                                  Middlewares and  API routes
 **********************************************************************************/

// Common middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:3001', 'http://localhost:3000'],
    credentials: true,
  }),
);

// Add api router
app.use('/', router);

// // Creating a Schema for GraphQL
// const schema = async () => {
//   const schema: any = await buildSchema({
//     resolvers: [UsersResolver],
//     emitSchemaFile: true,
//     validate: false,
//   });
//   app.use(
//     '/graphql',
//     graphqlHTTP({
//       schema,
//       graphiql: true,
//     }),
//   );
// };

// schema();

// Show routes called in console during development
if (process.env['NODE_ENV'] === 'development') {
  app.use(morgan('dev'));
}

// Security (helmet recommended in express docs)
if (process.env.NODE_ENV === 'production') {
  app.use(helmet());
}

/***********************************************************************************
 *                        error handling
 **********************************************************************************/
app.use(errorMiddleware);

// Export here and start in a diff file (for testing).
export default app;
