import { IUserLoginData } from "src/app/classes/auth.interface";

export interface IAuthDialogData {
    page: 'sign-in' | 'sign-up';
  }

  export interface IUserAuth extends IUserLoginData {
    isLoggedIn: boolean;
  }