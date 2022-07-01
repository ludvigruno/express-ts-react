/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router, Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import userRepo from '../repos/user-repo/user';
import { MESSAGES } from '../constants';

// Constants
const router = Router();
const { OK, BAD_REQUEST } = StatusCodes;
const { PROFILE, LIST_USERS } = MESSAGES;

// Paths
export const p = {
  getUserById: '/account',
  getUsers: '/people',
} as const;

/**
 *  Getting a user profile.
 */
router.get(p.getUserById, async (req: Request, res: Response) => {
  const id = req.query.id;
  try {
    if (typeof id === 'string') {
      const result = await userRepo.getUserById(id);
      res
        .status(OK)
        .json({
          isSuccess: true,
          result,
          message: PROFILE,
        })
        .end();
    }
  } catch (err) {
    res
      .status(BAD_REQUEST)
      .json({
        isSuccess: false,
        message: err,
      })
      .end();
  }
});

/**
 * Get a list of users.
 */
router.get(p.getUsers, async (req: Request, res: Response) => {
  const id = req.query.id;
  try {
    if (typeof id === 'string') {
      const result = await userRepo.getUsersWithoutCurrentId(id);
      res
        .status(OK)
        .json({
          isSuccess: true,
          result,
          message: LIST_USERS,
        })
        .end();
    }
  } catch (err) {
    res
      .status(BAD_REQUEST)
      .json({
        isSuccess: false,
        message: err,
      })
      .end();
  }
});

// Export default
export default router;
