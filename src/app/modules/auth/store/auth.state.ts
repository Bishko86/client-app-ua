import { IAuthError, IUserLoginData } from 'src/app/classes/auth.interface';
export interface IAuthState {
  isLoggedIn: boolean;
  isFetching: boolean;
  userAuthData: IUserLoginData;
  loginError: IAuthError | null;
  registrateError: IAuthError | null;
  registrateResult: {
    message: string;
    registrateIsSuccess: boolean;
  };
}

export const initialAuthState: IAuthState = {
  isLoggedIn: false,
  isFetching: false,
  userAuthData: {
    accessToken: '',
    username: '',
    email: '',
    roles: [],
  },
  loginError: null,
  registrateError: null,

  registrateResult: { message: '', registrateIsSuccess: false },
};
