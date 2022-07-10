import bcrypt from 'bcrypt';
import { HashPassword } from 'src/interfaces/user-auth-interface';

/**
 * Password hashing.
 * @param {string} password
 *
 * @returns {Promise<string>}
 */
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  const salt: string = await bcrypt.genSalt(saltRounds);
  const hashPassword: string = await bcrypt.hash(password, salt);
  return hashPassword;
};

/**
 * Password deCrypt.
 * @param {string} password
 *
 * @returns {Promise<string>}
 */
export const checkPassword = async (data: HashPassword): Promise<boolean> => {
  const { password, hashedPassword } = data;
  return await bcrypt.compare(password, hashedPassword);
};
