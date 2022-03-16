import { IAuthError } from 'src/app/classes/auth.interface';

export interface IAuthState {
  isLoggedIn: boolean;
  isFetching: boolean;
  userAuthData: IUserAuthData;
  loginError: IAuthError | null;
  registrateError: IAuthError | null;
  registrateResult: {
    message: string;
    registrateIsSuccess: boolean;
  };
}

interface IUserAuthData {
  accessToken: string;
  username: string;
  roles: string[];
}

export const initialAuthState: IAuthState = {
  isLoggedIn: false,
  isFetching: false,
  userAuthData: {
    accessToken: '',
    username: '',
    roles: [],
  },
  loginError: null,
  registrateError: null,

  registrateResult: { message: '', registrateIsSuccess: false },
};
