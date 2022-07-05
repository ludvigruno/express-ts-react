import { IUser } from 'src/interfaces/user-interface';
import { UserType } from 'src/types/types';
import { UserModel } from '../../models/users-model';
import { MESSAGES } from '../../constants';

// Constants
const { USER_CREATED } = MESSAGES;

/**
 * User registration.
 *
 * @param {IUser} data
 *
 * @returns {Promise<string>}
 */
async function registerUser(data: IUser): Promise<string> {
  const name = data.name;
  const surname = data.surname;
  const username = data.username;
  const email = data.email;
  const avatar = data.avatar;
  const age = data.age;
  const obj = {
    name,
    surname,
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
 * Getting list of users without client id.
 *
 * @param {string} id
 *
 * @returns {Promise<UserType[]>}
 */
async function getUsersWithoutCurrentId(id: string): Promise<UserType[]> {
  return (await UserModel.find({ _id: { $ne: id } })) as unknown as Promise<
    UserType[]
  >;
}

/**
 * Getting a list of all users.
 *
 * @returns {Promise<UserType[]>}
 */
async function getUsers(): Promise<UserType[]> {
  return (await UserModel.find()) as unknown as Promise<UserType[]>;
}

/**
 * Getting a user by id.
 *
 * @param {string} id
 *
 * @returns {Promise<UserType | null>}
 */
async function getUserById(id: string): Promise<UserType | null> {
  return await UserModel.findById(id);
}

// Export default
export default {
  registerUser,
  getUserById,
  getUsersWithoutCurrentId,
  getUsers,
} as const;
