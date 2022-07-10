import {
  UserAuthRepo,
  CreateUserAuthRepo,
} from '../../interfaces/user-auth-interface';
import { UserAuthModel } from '../../models/user-auth-model';

/**
 * Creation of user authentication.
 *
 * @param {CreateUserAuthRepo} data
 *
 * @returns {Promise<UserAuthRepo>}
 */
async function create(data: CreateUserAuthRepo): Promise<UserAuthRepo> {
  const email = data.email;
  const password = data.hashedPassword;
  const verifiedLink = data.verifiedLink;
  const obj = {
    email,
    password,
    verifiedLink,
    created_at: new Date(),
  };

  const userAuth = new UserAuthModel(obj);
  return await userAuth.save();
}

/**
 * Get user authentication.
 *
 * @param {string} email
 *
 * @returns {Promise<UserAuthRepo | null>}
 */

async function getUserAuthByEmail(email: string): Promise<UserAuthRepo | null> {
  return await UserAuthModel.findOne({ email });
}

/**
 * Get user authentication.
 *
 * @param {string} verifiedLink
 *
 * @returns {Promise<UserAuthRepo | null>}
 */

async function getUserAuthByLink(verifiedLink: string) {
  return await UserAuthModel.updateOne(
    { verifiedLink },
    { $set: { isVerified: true } },
  );
}

/**
 * Get user userUserAuthentication.
 *
 * @param {string} email
 *
 * @returns {Promise<UserAuthRepo | null>}
 */

async function getUserAuthById(id: string): Promise<UserAuthRepo | null> {
  return await UserAuthModel.findOne({ id });
}

/**
 * Get user userUserAuthentication.
 *
 * @param {string} email
 *
 * @returns {Promise<UserAuthRepo[]>}
 */

async function getAllUsersAuth(): Promise<UserAuthRepo[]> {
  return await UserAuthModel.find();
}

// Export default
export default {
  create,
  getUserAuthByEmail,
  getUserAuthByLink,
  getUserAuthById,
  getAllUsersAuth,
} as const;
