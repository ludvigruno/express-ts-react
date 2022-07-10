import {
  TokensGenerate,
  TokenUserRefresh,
  UserAuthRepo,
  InfoTokenResponse,
} from '../../interfaces/user-auth-interface';
import { TokenModel } from '../../models/token-model';

/**
 * Get user userAuthentication.
 *
 * @param {TokenUserRefresh} data
 *
 * @returns {Promise<UserAuthRepo | null>}
 */

async function create(data: TokenUserRefresh) {
  const { userAuthId, refreshToken } = data;
  await TokenModel.create({ userAuthId, refreshToken });
}

/**
 * Get user authentication.
 *
 * @param {TokenUserRefresh} data
 *
 * @returns {Promise<UserAuthRepo | null>}
 */
async function update(data: TokenUserRefresh) {
  const { userAuthId, refreshToken } = data;
  return await TokenModel.updateOne({ userAuthId }, { $set: { refreshToken } });
}

/**
 * Get user authentication.
 *
 * @param {string} id
 *
 * @returns {Promise<TokensGenerate | null>}
 */
async function get(id: string): Promise<TokensGenerate | null> {
  return await TokenModel.findById({ id });
}

/**
 * Delete user authentication.
 *
 * @param {string} refreshToken
 *
 * @returns {Promise<InfoTokenResponse>}
 */
async function deleteToken(refreshToken: string): Promise<InfoTokenResponse> {
  return await TokenModel.deleteOne({ refreshToken });
}

/**
 * Find user by token authentication.
 *
 * @param {string} token
 *
 * @returns {Promise<UserAuthRepo | null>}
 */
async function findToken(token: string): Promise<UserAuthRepo | null> {
  return await TokenModel.findOne({ token });
}

// Export default
export default {
  create,
  update,
  get,
  deleteToken,
  findToken,
} as const;
