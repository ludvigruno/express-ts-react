// import { Query, Resolver, Arg } from 'type-graphql';
// import { UserNested } from '../schema/users';
// import { UserNestedType } from '../../types/types';
// import userService from '../../services/user-service/user';

// @Resolver(() => UserNested)
// export class UsersResolver {
//   @Query(() => UserNested)
//   async getCurrentUser(@Arg('token') token: string): Promise<UserNestedType> {
//     console.log(token);
//     return await userService.getCurrentUser(token);
//   }

//   async getUsers(): Promise<UserNestedType[]> {
//     return await userService.getUsers();
//   }

//   @Query(() => [UserNested])
//   async getUsersWithoutCurrentId(
//     @Arg('id') id: string,
//   ): Promise<UserNestedType[]> {
//     return await userService.getUsersWithoutCurrentId(id);
//   }

//   @Query(() => UserNested)
//   async getUserById(@Arg('id') id: string): Promise<UserNestedType> {
//     return await userService.getUserById(id);
//   }
// }
