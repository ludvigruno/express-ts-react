import * as uuid from 'uuid';
import userAuthRepo from '@repos/user-auth-repo/auth';
import {
  SignUpRequest,
  AuthResponse,
  UserAuthRepo,
  TokensGenerate,
  SignInRequest,
  InfoTokenResponse,
} from 'src/interfaces/user-auth-interface';
import { hashPassword, checkPassword } from './hash-password-service';
// import { sendVerefiedMail } from './mail-service';
import tokenService from './token-service';
import UserAuthDto from '../../dto/user-auth-dto';
import { IDto } from '../../dto/interace';

import { MESSAGES } from 'src/constants';
import { ApiError } from '@shared/errors';
import userService from '@services/user-service/user-service';

const signUp = async (data: SignUpRequest): Promise<AuthResponse> => {
  const { email, password, repeatPassword } = data;
  const condidate: UserAuthRepo | null = await userAuthRepo.getUserAuthByEmail(
    email,
  );
  if (condidate) {
    throw ApiError.BadRequest(`User ${email} already exists.`);
  }
  if (password !== repeatPassword) {
    throw ApiError.BadRequest(MESSAGES.PASSWORDS_DO_NOT_MATCH);
  }

  const verifiedLink: string = uuid.v4();

  const hashedPassword: string = await hashPassword(password);
  /* TODO fix */
  // await sendVerefiedMail(
  //   email,
  //   `${String(process.env.API_URL)}/api/activate/${verifiedLink}`,
  // );
  const userAuth: UserAuthRepo = await userAuthRepo.create({
    email,
    hashedPassword,
    verifiedLink,
  });

  const userAuthDto: IDto = new UserAuthDto(userAuth);
  const tokens: TokensGenerate = tokenService.generateTokens({
    ...userAuthDto,
  });
  await tokenService.createToken({
    userAuthId: userAuthDto.id,
    refreshToken: tokens.refreshToken,
  });

  await userService.creatUser({
    email: userAuthDto.email,
    userAuthId: userAuthDto.id,
  });
  return {
    ...tokens,
    user: userAuthDto,
  };
};

const verify = async (verifiedLink: string) => {
  const userAuth = await userAuthRepo.getUserAuthByLink(verifiedLink);
  if (!userAuth.modifiedCount) {
    throw ApiError.BadRequest(`Неккоректная ссылка активации`);
  }
};

const signIn = async (data: SignInRequest): Promise<AuthResponse> => {
  const { email, password } = data;
  const userAuth: UserAuthRepo | null = await userAuthRepo.getUserAuthByEmail(
    email,
  );
  if (!userAuth) {
    throw ApiError.BadRequest(`User ${email} not found.`);
  }

  // if (!userAuth.isVerified) {
  //   throw ApiError.BadRequest(`Link not validated.`);
  // }

  const isPasswordEquals: boolean = await checkPassword({
    password,
    hashedPassword: userAuth.password,
  });
  if (!isPasswordEquals) {
    throw ApiError.BadRequest('Invalid password.');
  }

  const userAuthDto: IDto = new UserAuthDto(userAuth);
  const tokens: TokensGenerate = tokenService.generateTokens({
    ...userAuthDto,
  });

  await tokenService.createToken({
    userAuthId: userAuthDto.id,
    refreshToken: tokens.refreshToken,
  });

  return {
    ...tokens,
    user: userAuthDto,
  };
};

const logout = async (refreshToken: string): Promise<InfoTokenResponse> =>
  await tokenService.removeToken(refreshToken);

const refresh = async (refreshToken: string): Promise<AuthResponse> => {
  if (!refreshToken) {
    throw ApiError.UnautorizeError();
  }
  const userAuthVerify: { [x: string]: string } =
    tokenService.validateRefreshToken(refreshToken);
  const tokenFromDB = await tokenService.findToken(refreshToken);
  if (!userAuthVerify || !tokenFromDB) {
    throw ApiError.UnautorizeError();
  }

  const userAuth = await userAuthRepo.getUserAuthById(userAuthVerify.id);
  const userAuthDto: IDto = new UserAuthDto(userAuth);
  const tokens: TokensGenerate = tokenService.generateTokens({
    ...userAuthDto,
  });

  await tokenService.createToken({
    userAuthId: userAuthDto.id,
    refreshToken: tokens.refreshToken,
  });
  return {
    ...tokens,
    user: userAuthDto,
  };
};

const getAllUsersAuth = async (): Promise<UserAuthRepo[]> => {
  return await userAuthRepo.getAllUsersAuth();
};

// Export default
export default {
  signUp,
  verify,
  signIn,
  logout,
  refresh,
  getAllUsersAuth,
} as const;
