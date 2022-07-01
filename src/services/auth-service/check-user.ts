import { IAuthUser } from '../../routes/interfaces';
import authRepo from '../../repos/auth-repo/auth-user';
import { MESSAGES } from 'src/constants';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

/**
 * User verification during registration.
 * @param {IAuthUser} data
 *
 * @returns {Promise<string>}
 */
async function checkUserSignUp(data: IAuthUser): Promise<string> {
  const isExistUser: IAuthUser | null = await authRepo.getAuth(data);
  if (isExistUser) {
    throw `User ${isExistUser.email} already exists.`;
  } else {
    const { password, repeatPassword } = data;
    if (password !== repeatPassword) {
      throw MESSAGES.PASSWORDS_DO_NOT_MATCH;
    }
    return 'Успех';
  }
}

/**
 * User login verification.
 * @param {IAuthUser} data
 *
 * @returns {Promise<string>}
 */
async function checkUserSignIn(data: IAuthUser): Promise<string> {
  const isExistUser: IAuthUser | null = await authRepo.getAuth(data);
  if (isExistUser) {
    if (!bcrypt.compareSync(data.password, isExistUser.password)) {
      throw MESSAGES.WRONG_PASSWORD;
    }
    return MESSAGES.USER_VERIFIED;
  } else {
    throw `User ${data.email} does not exist.`;
  }
}

// Export default
export default {
  checkUserSignUp,
  checkUserSignIn,
} as const;
