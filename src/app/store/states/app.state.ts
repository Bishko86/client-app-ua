import { RouterReducerState } from '@ngrx/router-store';
import { initialUserState, IUserState } from './user.state';
import { IConfigState, initialConfigState } from './config.state';
import { initialPhotoState, IPhotoState } from './photo.state';
import { IAuthState, initialAuthState } from './auth.state';

export interface IAppState {
  router?: RouterReducerState;
  users: IUserState;
  config: IConfigState;
  photos: IPhotoState;
  auth: IAuthState;
}

export const initialAppState: IAppState = {
  users: initialUserState,
  config: initialConfigState,
  photos: initialPhotoState,
  auth: initialAuthState,
}

export const getInitialState = () => initialAppState;