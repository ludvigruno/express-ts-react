export interface IBodyRequest {
  data: IAuthUser;
}

export interface IAuthUser {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
  avatar?: string;
  age?: number;
}
