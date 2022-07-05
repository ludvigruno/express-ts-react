/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router, Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import { body, check, validationResult } from 'express-validator';

import authRepo from '../repos/auth-repo/auth-user';
import userRepo from '../repos/user-repo/user';
import authService from '../services/auth-service/check-user';
import { cryptPassword } from '../services/auth-service/crypt-password';
import { IUser } from '../interfaces/user-interface';

import { MESSAGES } from '../constants';

// Constants
const router = Router();
const { CREATED, BAD_REQUEST, OK } = StatusCodes;
const {
  PASSWORD_CHARACTERS,
  PASSWORD_IS_NOT_VALID,
  PASSWORD_IS_NOT_VALID_WORD,
} = MESSAGES;

// Paths
export const p = {
  signUp: '/sign-up',
  signIn: '/sign-in',
} as const;

/**
 *  UserType registration
 */
router.post(
  p.signUp,
  check('user.username').not().isEmpty().isString(),
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
  check('user.avatar').isString(),
  check('user.age').not().isEmpty().isNumeric(),
  async (req: Request, res: Response): Promise<void> => {
    const user: IUser = req.body.user;

    try {
      await authService.checkUserSignUp(user);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw errors.array();
      }

      const data: IUser = await cryptPassword(user);

      await authRepo.createAuth(data);

      const result: string = await userRepo.registerUser(user);
      res
        .status(CREATED)
        .json({
          isSuccess: true,
          message: result,
        })
        .end();
    } catch (err) {
      res
        .status(BAD_REQUEST)
        .json({
          isSuccess: false,
          message: err,
        })
        .end();
    }
  },
);

/**
 * UserType login
 */
router.post(
  p.signIn,
  body('user.email').isEmail(),
  body('user.password')
    .isLength({ min: PASSWORD_CHARACTERS })
    .withMessage(PASSWORD_IS_NOT_VALID),
  async (req: Request, res: Response): Promise<void> => {
    const user: IUser = req.body.user;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw errors.array();
      }
      const result = await authService.checkUserSignIn(user);
      res
        .status(OK)
        .json({
          isSuccess: true,
          message: result,
        })
        .end();
    } catch (err) {
      res
        .status(BAD_REQUEST)
        .json({
          isSuccess: false,
          message: err,
        })
        .end();
    }
  },
);

// Export default
export default router;
