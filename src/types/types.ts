export type UserNestedType = {
  user: UserType;
};

export type UserType = {
  name: string;
  surname: string;
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
  avatar?: string;
  age?: number;
};
