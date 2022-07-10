/* eslint-disable @typescript-eslint/no-misused-promises */
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import userAuthService from '../services/user-auth-service/auth-service';
import { UserAuthRepo } from '../interfaces/user-auth-interface';

import { ApiError } from '@shared/errors';

import {
  SignUpRequest,
  AuthResponse,
  SignInRequest,
  InfoTokenResponse,
} from '../interfaces/user-auth-interface';

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.BadRequest('Ошибка при валидации', errors.array()));
    }
    const { email, password, repeatPassword }: SignUpRequest = req.body.user;
    const userAuthData: AuthResponse = await userAuthService.signUp({
      email,
      password,
      repeatPassword,
    });

    res
      .cookie('refreshToken', userAuthData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: false,
      })
      .json(userAuthData)
      .end();
  } catch (error) {
    next(error);
  }
};

/*добавить условие когда пользователь еще не верифицировался по ссылкке в письме*/
const verify = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const verifiedLink: string = req.params.link;
    await userAuthService.verify(verifiedLink);
    return res.redirect(String(process.env.CLIENT_URL));
  } catch (error) {
    next(error);
  }
};

const signIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.BadRequest('Ошибка при валидации', errors.array()));
    }

    const { email, password }: SignInRequest = req.body.user;
    const userAuthData: AuthResponse = await userAuthService.signIn({
      email,
      password,
    });
    res
      .cookie('refreshToken', userAuthData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: false,
      })
      .json(userAuthData)
      .end();
  } catch (error) {
    next(error);
  }
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const refreshToken: string = req.cookies.refreshToken;
    const tokenDataRemove: InfoTokenResponse = await userAuthService.logout(
      refreshToken,
    );
    res.clearCookie('refreshToken');
    return res.json(tokenDataRemove);
  } catch (error) {
    next(error);
  }
};

const refresh = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const refreshToken: string = req.cookies.refreshToken;
    const userAuthData: AuthResponse = await userAuthService.refresh(
      refreshToken,
    );
    res
      .cookie('refreshToken', userAuthData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: false,
      })
      .json(userAuthData)
      .end();
  } catch (error) {
    next(error);
  }
};

const getUsersAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userAuths: UserAuthRepo[] = await userAuthService.getAllUsersAuth();
    res.json(userAuths);
  } catch (error) {
    next(error);
  }
};

// Export default
export default {
  signUp,
  signIn,
  logout,
  verify,
  refresh,
  getUsersAuth,
} as const;
