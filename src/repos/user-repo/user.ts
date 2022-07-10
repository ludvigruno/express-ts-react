import { CreateUser, User } from 'src/interfaces/user-interface';
import { UserModel } from '../../models/users-model';
import { MESSAGES } from '../../constants';

// Constants
const { USER_CREATED } = MESSAGES;

/**
 * User create.
 *
 * @param {CreateUser} data
 *
 * @returns {Promise<void>}
 */
async function creatUser(data: CreateUser): Promise<void> {
  const { email, userAuthId } = data;
  const username = email.split('@')[0];
  const obj = {
    username,
    email,
    userAuthId,
    created_at: new Date(),
  };

  const user = new UserModel(obj);
  await user.save();
}

/**
 * Getting a list of all users.
 *
 * @returns {Promise<User[]>}
 */
async function getUsers(): Promise<User[]> {
  return await UserModel.find();
}

// /**
//  * Getting list of users without client id.
//  *
//  * @param {string} id
//  *
//  * @returns {Promise<UserType[]>}
//  */
// async function getUsersWithoutCurrentId(id: string): Promise<UserType[]> {
//   return (await UserModel.find({ _id: { $ne: id } })) as unknown as Promise<
//     UserType[]
//   >;
// }

// /**
//  * Getting a list of all users.
//  *
//  * @returns {Promise<UserType[]>}
//  */
// async function getUsers(): Promise<UserType[]> {
//   return (await UserModel.find()) as unknown as Promise<UserType[]>;
// }

// /**
//  * Getting a user by id.
//  *
//  * @param {string} id
//  *
//  * @returns {Promise<UserType | null>}
//  */
// async function getUserById(id: string): Promise<UserType | null> {
//   return await UserModel.findById(id);
// }

// /**
//  * Getting a user by client Account Id.
//  *
//  * @param {string} email
//  *
//  * @returns {Promise<UserType | null>}
//  */
// async function getUserByClientAccountId(
//   clientAccountId: string,
// ): Promise<UserType | null> {
//   return await UserModel.findOne({ clientAccountId });
// }

// Export default
export default {
  creatUser,
  getUsers,
  // getUsersWithoutCurrentId,
  // getUsers,
  // getUserByClientAccountId,
} as const;
