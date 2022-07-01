import { IAuthUser } from '../../routes/interfaces';
import { AuthModel } from '../../models/auth-model';

/**
 * Создание аутентификации.
 *
 * @param {IAuthUser} data
 * @returns {Promise<void>}
 */
async function createAuth(data: IAuthUser): Promise<void> {
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
 * Получение аутентификации пользователя.
 *
 * @param {IAuthUser} data
 * @returns {Promise<IAuthUser | null>}
 */

async function getAuth(data: IAuthUser): Promise<IAuthUser | null> {
  return await AuthModel.findOne({ email: data.email });
}

// Export default
export default {
  createAuth,
  getAuth,
} as const;
