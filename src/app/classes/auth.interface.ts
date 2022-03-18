export interface IUserLoginData {
  email: string;
  username: string;
  accessToken: string;
  roles: string[];
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
  normalizedNames: NormalizedNames;
  lazyUpdate: any;
}

export interface NormalizedNames {}

export interface Error {
  message: string;
}
