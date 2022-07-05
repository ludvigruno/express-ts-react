import { IUser } from '../../interfaces/user-interface';
import authRepo from '../../repos/auth-repo/auth-user';
import { MESSAGES } from 'src/constants';
import bcrypt from 'bcrypt';

/**
 * UserType verification during registration.
 * @param {IUser} data
 *
 * @returns {Promise<IUser>}
 */
async function checkUserSignUp(data: IUser): Promise<void> {
  const isExistUser: IUser | null = await authRepo.getAuth(data);
  if (isExistUser) {
    throw `User ${isExistUser.email} already exists.`;
  } else {
    const { password, repeatPassword } = data;
    if (password !== repeatPassword) {
      throw MESSAGES.PASSWORDS_DO_NOT_MATCH;
    }
  }
}

/**
 * UserType login verification.
 * @param {IUser} data
 *
 * @returns {Promise<string>}
 */
async function checkUserSignIn(data: IUser): Promise<string> {
  const isExistUser: IUser | null = await authRepo.getAuth(data);
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
