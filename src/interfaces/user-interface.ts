export interface CreateUser {
  email: string;
  userAuthId: string;
}

export interface User {
  name: string;
  surname: string;
  username: string;
  email: string;
  avatar?: string;
  age?: number;
}
