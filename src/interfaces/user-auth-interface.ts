import { IDto } from 'src/dto/interace';

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignUpRequest extends SignInRequest {
  repeatPassword: string;
}

export interface TokensGenerate {
  accessToken: string;
  refreshToken: string;
}
export interface AuthResponse extends TokensGenerate {
  user: IDto;
}

export interface UserAuthRepo extends SignInRequest {
  isVerified: boolean;
  verifiedLink: string;
}

export interface CreateUserAuthRepo {
  email: string;
  verifiedLink: string;
  hashedPassword: string;
}

export interface HashPassword {
  password: string;
  hashedPassword: string;
}

export interface TokenUserRefresh {
  userAuthId: string;
  refreshToken: string;
}

export interface InfoTokenResponse {
  acknowledged: boolean;
  deletedCount: number;
}
