import { UserType, UserNestedType } from '../../types/types';
import userRepo from '../../repos/user-repo/user';

/**
 * Get all users.
 *
 * @returns {Promise<UserNestedType[]>}
 */
async function getUsers(): Promise<UserNestedType[]> {
  const users: UserType[] | null = await userRepo.getUsers();

  if (!users[0]) {
    throw `Users not found.`;
  } else {
    const usersNew = users.map((user) => {
      return { user: user };
    });
    return usersNew;
  }
}

/**
 * Getting a list of users without a client id.
 * @param {string} id
 *
 * @returns {Promise<UserNestedType[]>}
 */
async function getUsersWithoutCurrentId(id: string): Promise<UserNestedType[]> {
  const users: UserType[] = await userRepo.getUsersWithoutCurrentId(id);
  if (!users[0]) {
    throw `Users not found.`;
  } else {
    const usersNew = users.map((user) => {
      return { user: user };
    });
    return usersNew;
  }
}

/**
 * Getting a user by id.
 * @param {string} id

 * @returns {Promise<UserNestedType>}
 */
async function getUserById(id: string): Promise<UserNestedType> {
  const user: UserType | null = await userRepo.getUserById(id);
  if (!user) {
    throw `User not found.`;
  } else {
    return { user: user };
  }
}

// Export default
export default {
  getUsers,
  getUsersWithoutCurrentId,
  getUserById,
} as const;
