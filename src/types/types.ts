export type UserNestedType = {
  user: UserType;
};

export type UserType = {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
  avatar?: string;
  age?: number;
};