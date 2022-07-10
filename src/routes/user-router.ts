import { Router, Request, Response } from 'express';
import userController from '../controllers/user-controller';

import { userAuthGuard } from '../middlewares/user-auth-guard-middleware';

// Constants
const router = Router();

// Paths
const path = {
  getUsersAll: '/users-test',
  getUsersWithoutCurrent: '/users',
  profile: '/profile/:id',
} as const;

router.get(
  path.getUsersAll,
  userAuthGuard,
  (req: Request, res: Response, next) =>
    userController.getUsers(req, res, next),
);

// router.get(
//   path.getUsersWithoutCurrent,
//   userAuthGuard,
//   (req: Request, res: Response, next: NextFunction) => {
//     userController.signIn(req, res, next);
//   },
// );

// router.get(
//   path.profile,
//   userAuthGuard,
//   (req: Request, res: Response, next: NextFunction) => {
//     userController.logout(req, res, next);
//   },
// );

export default router;
