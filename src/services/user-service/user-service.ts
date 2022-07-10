import userRepo from '@repos/user-repo/user';
import { CreateUser, User } from 'src/interfaces/user-interface';

const creatUser = async (data: CreateUser) => await userRepo.creatUser(data);

const getUsers = async (): Promise<User[]> => await userRepo.getUsers();

// Export default
export default {
  creatUser,
  getUsers,
} as const;
