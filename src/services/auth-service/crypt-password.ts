import { IAuthUser } from '../../routes/interfaces';
import { UserType } from '../../routes/types';
const bcrypt = require('bcrypt');

/**
 * Password hashing.
 * @param {IAuthUser} data
 *
 * @returns {Promise<UserType>}
 */
export const cryptPassword = async (data: IAuthUser): Promise<UserType> => {
  const { password } = data;
  const saltRounds = 10;
  const salt: string = await bcrypt.genSalt(saltRounds);
  const hashPassword: string = await bcrypt.hash(password, salt);
  data['password'] = hashPassword;
  return data;
};
