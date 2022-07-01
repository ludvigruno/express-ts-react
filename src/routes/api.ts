import { Router } from 'express';
import authRouter from './auth-router';
import userRouter from './user-router';

// Export the base-router
const baseRouter = Router();

// Setup routers
baseRouter.use('/', authRouter);
baseRouter.use('/route', userRouter);

// Export default.
export default baseRouter;
