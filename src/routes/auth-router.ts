import { Router, Request, Response, NextFunction } from 'express';
import { body, check } from 'express-validator';
import { MESSAGES } from 'src/constants';
import userAuthController from '../controllers/user-auth-controller';

import { userAuthGuard } from '../middlewares/user-auth-guard-middleware';

// Constants
const router = Router();

const {
  PASSWORD_CHARACTERS,
  PASSWORD_IS_NOT_VALID,
  PASSWORD_IS_NOT_VALID_WORD,
} = MESSAGES;

// Paths
const path = {
  signUp: '/sign-up',
  signIn: '/sign-in',
  logout: '/logout',
  verify: '/activate/:link',
  refresh: '/refresh',
  users: '/users-auth',
} as const;

router.post(
  path.signUp,
  // check('user.username').not().isEmpty().isString(),
  check('user.email').isEmail(),
  check('user.password')
    .isLength({ min: PASSWORD_CHARACTERS })
    .withMessage(PASSWORD_IS_NOT_VALID)
    .not()
    .isIn(PASSWORD_IS_NOT_VALID_WORD.PARAMS)
    .withMessage(PASSWORD_IS_NOT_VALID_WORD.MESSAGE),
  check('user.repeatPassword')
    .isLength({ min: PASSWORD_CHARACTERS })
    .withMessage(PASSWORD_IS_NOT_VALID)
    .not()
    .isIn(PASSWORD_IS_NOT_VALID_WORD.PARAMS)
    .withMessage(PASSWORD_IS_NOT_VALID_WORD.MESSAGE),
  // check('user.avatar').isString(),
  // check('user.age').not().isEmpty().isNumeric(),
  (req: Request, res: Response, next) =>
    userAuthController.signUp(req, res, next),
);

router.post(
  path.signIn,
  check('user.email').isEmail(),
  body('user.password'),
  (req: Request, res: Response, next: NextFunction) => {
    userAuthController.signIn(req, res, next);
  },
);

router.post(path.logout, (req: Request, res: Response, next: NextFunction) => {
  userAuthController.logout(req, res, next);
});

router.get(path.verify, (req: Request, res: Response, next: NextFunction) => {
  userAuthController.verify(req, res, next);
});

router.get(path.refresh, (req: Request, res: Response, next: NextFunction) => {
  userAuthController.refresh(req, res, next);
});

router.get(
  path.users,
  userAuthGuard,
  (req: Request, res: Response, next: NextFunction) => {
    userAuthController.getUsersAuth(req, res, next);
  },
);

export default router;
