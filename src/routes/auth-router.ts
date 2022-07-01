/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router, Request, Response } from 'express';
import StatusCodes from 'http-status-codes';

import { body, check, validationResult } from 'express-validator';

import authRepo from '../repos/auth-repo/auth-user';
import userRepo from '../repos/user-repo/user';
import authService from '../services/auth-service/check-user';
import { cryptPassword } from '../services/auth-service/crypt-password';
import { IBodyRequest, IAuthUser } from './interfaces';

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
 *  User registration
 */
router.post(
  p.signUp,
  check('data.username').not().isEmpty().isString(),
  check('data.email').isEmail(),
  check('data.password')
    .isLength({ min: PASSWORD_CHARACTERS })
    .withMessage(PASSWORD_IS_NOT_VALID)
    .not()
    .isIn(PASSWORD_IS_NOT_VALID_WORD.PARAMS)
    .withMessage(PASSWORD_IS_NOT_VALID_WORD.MESSAGE),
  check('data.repeatPassword')
    .isLength({ min: PASSWORD_CHARACTERS })
    .withMessage(PASSWORD_IS_NOT_VALID)
    .not()
    .isIn(PASSWORD_IS_NOT_VALID_WORD.PARAMS)
    .withMessage(PASSWORD_IS_NOT_VALID_WORD.MESSAGE),
  check('data.avatar').isString(),
  check('data.age').not().isEmpty().isNumeric(),
  async (req: Request, res: Response): Promise<void> => {
    const body: IBodyRequest = req.body;
    try {
      await authService.checkUserSignUp(body.data);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw errors.array();
      }
      const data: IAuthUser = await cryptPassword(body.data);

      await authRepo.createAuth(data);

      const result: string = await userRepo.registerUser(body.data);
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
 * User login
 */
router.post(
  p.signIn,
  body('data.email').isEmail(),
  body('data.password')
    .isLength({ min: PASSWORD_CHARACTERS })
    .withMessage(PASSWORD_IS_NOT_VALID),
  async (req: Request, res: Response): Promise<void> => {
    const body: IBodyRequest = req.body;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw errors.array();
      }
      const result = await authService.checkUserSignIn(body.data);
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
