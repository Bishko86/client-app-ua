import { IUserLoginData } from 'src/app/modules/auth/store/auth.interface';

export interface IAuthDialogData {
  page: 'sign-in' | 'sign-up';
}

export interface IUserAuth extends IUserLoginData {
  isLoggedIn: boolean;
}
export interface ITokenPair {
  accessToken: string;
  refreshToken: string;
}
