export interface IUserLoginCredentials {
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface IUserLoginData {
  email: string;
  username: string;
  accessToken: string;
  refreshToken: string; 
  roles: string[];
  id: string;
  status: string;
}

export interface IUserRegistrated {
  message: string;
  registrateIsSuccess: boolean;
}

export interface IAuthError {
  headers: Headers;
  status: number;
  statusText: string;
  url: string;
  ok: boolean;
  name: string;
  message: string;
  error: Error;
}

export interface Headers {
  normalizedNames: any;
  lazyUpdate: any;
}

export interface Error {
  message: string;
}
