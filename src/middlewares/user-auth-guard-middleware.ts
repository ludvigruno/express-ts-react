import { ApiError } from '@shared/errors';
import { Request, Response, NextFunction } from 'express';

import tokenService from '@services/user-auth-service/token-service';

export const userAuthGuard = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const autorizationHeader = req.headers.authorization;
    if (!autorizationHeader) {
      return next(ApiError.UnautorizeError());
    }
    const accessToken = autorizationHeader.split(' ')[1];
    if (!accessToken) {
      return next(ApiError.UnautorizeError());
    }

    const userUserAuthData = tokenService.validateAccessToken(accessToken);
    if (!userUserAuthData) {
      return next(ApiError.UnautorizeError());
    }
    req.user = userUserAuthData;
    next();
  } catch (error) {
    return next(ApiError.UnautorizeError());
  }
};
