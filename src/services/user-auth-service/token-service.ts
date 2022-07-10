import * as jwt from 'jsonwebtoken';
import { IDto } from '../../dto/interace';
import tokenRepo from '@repos/token-repo/token';
import { ApiError } from '@shared/errors';
import {
  TokensGenerate,
  TokenUserRefresh,
  UserAuthRepo,
  InfoTokenResponse,
} from 'src/interfaces/user-auth-interface';

const generateTokens = (payload: IDto): TokensGenerate => {
  const accessToken = jwt.sign(payload, 'secretlkdm-access', {
    expiresIn: '30s',
  });
  const refreshToken = jwt.sign(payload, 'secretlkdm-refresh', {
    expiresIn: '30d',
  });
  return {
    accessToken,
    refreshToken,
  };
};

/* TODO - продумать удаление протухших токенов из бд и случай захода с другого устройства
 */
const createToken = async (data: TokenUserRefresh): Promise<void> => {
  const { userAuthId, refreshToken } = data;
  const tokenData = await tokenRepo.update({ userAuthId, refreshToken });
  if (!tokenData.modifiedCount) {
    await tokenRepo.create({ userAuthId, refreshToken });
  }
};

const removeToken = async (refreshToken: string): Promise<InfoTokenResponse> =>
  await tokenRepo.deleteToken(refreshToken);

const validateAccessToken = (token: string) => {
  try {
    const { id } = jwt.verify(token, 'secretlkdm-access') as jwt.JwtPayload;
    return { id };
  } catch (e) {
    throw ApiError.UnautorizeError();
  }
};

const validateRefreshToken = (token: string) => {
  try {
    const { id } = jwt.verify(token, 'secretlkdm-refresh') as jwt.JwtPayload;
    return { id };
  } catch (e) {
    throw ApiError.UnautorizeError();
  }
};

const findToken = async (token: string): Promise<UserAuthRepo | null> => {
  return await tokenRepo.findToken(token);
};

// Export default
export default {
  generateTokens,
  createToken,
  removeToken,
  validateAccessToken,
  validateRefreshToken,
  findToken,
} as const;
