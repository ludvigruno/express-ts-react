/* eslint-disable @typescript-eslint/no-misused-promises */
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import userService from '../services/user-service/user-service';
import { UserAuthRepo } from '../interfaces/user-auth-interface';

import { ApiError } from '@shared/errors';

import { User } from '../interfaces/user-interface';

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users: User[] = await userService.getUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// Export default
export default {
  getUsers,
} as const;
