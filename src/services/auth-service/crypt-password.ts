import { IUser } from '../../interfaces/user-interface';
import { UserType } from '../../types/types';
import bcrypt from 'bcrypt';

/**
 * Password hashing.
 * @param {IUser} data
 *
 * @returns {Promise<UserType>}
 */
export const cryptPassword = async (data: IUser): Promise<UserType> => {
  const { password } = data;
  const saltRounds = 10;
  const salt: string = await bcrypt.genSalt(saltRounds);
  const hashPassword: string = await bcrypt.hash(password, salt);
  data['password'] = hashPassword;
  return data;
};
