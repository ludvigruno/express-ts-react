import { IUser } from '../../interfaces/user-interface';
import { AuthModel } from '../../models/auth-model';

/**
 * Creation of authentication.
 *
 * @param {IUser} data
 *
 * @returns {Promise<void>}
 */
async function createAuth(data: IUser): Promise<void> {
  const username = data.username;
  const email = data.email;
  const password = data.password;
  const obj = {
    username,
    email,
    password,
    created_at: new Date(),
  };

  const auth = new AuthModel(obj);
  await auth.save();
}

/**
 * Get user authentication.
 *
 * @param {IUser} data
 *
 * @returns {Promise<IUser | null>}
 */

async function getAuth(data: IUser): Promise<IUser | null> {
  return await AuthModel.findOne({ email: data.email });
}

// Export default
export default {
  createAuth,
  getAuth,
} as const;
