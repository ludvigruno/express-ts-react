import { IAuthUser } from '@routes/interfaces';
import { UserType } from '@routes/types';
import { UserModel } from '../../models/users-model';
import { MESSAGES } from '../../constants';

// Constants
const { USER_CREATED } = MESSAGES;

/**
 * Регистрация пользователя.
 *
 * @param {IAuthUser} data
 * @returns {Promise<string>}
 */
async function registerUser(data: IAuthUser): Promise<string> {
  const username = data.username;
  const email = data.email;
  const avatar = data.avatar;
  const age = data.age;
  const obj = {
    username,
    email,
    avatar,
    age,
    created_at: new Date(),
  };

  const user = new UserModel(obj);

  await user.save();
  return USER_CREATED;
}

/**
 * Получение пользователя по id
 *
 * @param {string} id
 * @returns {Promise<UserType | null>}
 */
async function getUserById(id: string): Promise<UserType | null> {
  return await UserModel.findById(id);
}

/**
 * Получение списка пользователей без клиента id
 *
 * @param {string} id
 * @returns {Promise<(UserType | null)[]>}
 */
async function getUsersWithoutCurrentId(
  id: string,
): Promise<(UserType | null)[]> {
  return await UserModel.find({ _id: { $ne: id } });
}

// Export default
export default {
  registerUser,
  getUserById,
  getUsersWithoutCurrentId,
} as const;
