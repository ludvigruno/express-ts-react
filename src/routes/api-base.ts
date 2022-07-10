import { Router } from 'express';
import authRouter from './auth-router';
import userRouter from './user-router';

// constant the base-router.
const baseRouter = Router();

// Setup router
baseRouter.use('/api', authRouter);
baseRouter.use('/user', userRouter);

// Export the base-router.
export default baseRouter;
