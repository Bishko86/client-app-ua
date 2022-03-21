import { IAuthError, IUserLoginData } from "./auth.interface";
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
  isLoggedIn: !!localStorage.getItem('isLoggedIn'),
  isFetching: false,
  userAuthData: {
    accessToken: localStorage.getItem('accessToken') || '',
    username: localStorage.getItem('username') ||'',
    email: '',
    roles: [],
  },
  loginError: null,
  registrateError: null,

  registrateResult: { message: '', registrateIsSuccess: false },
};
