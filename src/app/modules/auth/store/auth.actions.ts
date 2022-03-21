import { Action } from '@ngrx/store';
import {
  IAuthError,
  IUserLoginCredentials,
  IUserLoginData,
  IUserRegistrated,
} from 'src/app/modules/auth/store/auth.interface';

export enum EAuthActions {
  LOGOUT = '[Auth] Logout',
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] login Faliure',
  REGISTRATION = '[Auth] Registration',
  REGISTRATION_SUCCESS = '[Auth] Registration Success',
  REGISTRATION_FAILURE = '[Auth] Registration Failure',
  IS_FETCHING = '[Auth] Auth Is Fetching',
  ERASE_LOGIN_ERROR = '[Auth] Erase Login Error',
  ERASE_REGISTRATE_ERROR = '[Auth] Erase Registrate Error',
}

export class Login implements Action {
  public readonly type = EAuthActions.LOGIN;
  constructor(public payload: IUserLoginCredentials) {}
}

export class LoginSuccess implements Action {
  public readonly type = EAuthActions.LOGIN_SUCCESS;
  constructor(public payload: IUserLoginData) {}
}

export class LoginFailure implements Action {
  public readonly type = EAuthActions.LOGIN_FAILURE;
  constructor(public payload: IAuthError) {}
}

export class Registration implements Action {
  public readonly type = EAuthActions.REGISTRATION;
  constructor(public payload: IUserLoginCredentials) {}
}

export class RegistrationSuccess implements Action {
  public readonly type = EAuthActions.REGISTRATION_SUCCESS;
  constructor(public payload: IUserRegistrated) {}
}

export class RegistrationFailure implements Action {
  public readonly type = EAuthActions.REGISTRATION_FAILURE;
  constructor(public payload: IAuthError) {}
}

export class AuthIsFetching implements Action {
  public readonly type = EAuthActions.IS_FETCHING;
  constructor(public payload: boolean) {}
}

export class Logout implements Action {
  public readonly type = EAuthActions.LOGOUT;
}

export class EraseLoginError implements Action {
  public readonly type = EAuthActions.ERASE_LOGIN_ERROR;
}
export class EraseRegistrateError implements Action {
  public readonly type = EAuthActions.ERASE_REGISTRATE_ERROR;
}

export type AuthActions =
  | Login
  | LoginSuccess
  | LoginFailure
  | Registration
  | RegistrationSuccess
  | RegistrationFailure
  | AuthIsFetching
  | Logout
  | EraseLoginError
  | EraseRegistrateError;
