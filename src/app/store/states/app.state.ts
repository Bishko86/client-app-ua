import { RouterReducerState } from '@ngrx/router-store';
import { initialUserState, IUserState } from './user.state';
import { initialPhotoState, IPhotoState } from '../../modules/gallery/store/photo.state';
import { IAuthState, initialAuthState } from '../../modules/auth/store/auth.state';

export interface IAppState {
  router?: RouterReducerState;
  users: IUserState;
  photos: IPhotoState;
  auth: IAuthState;
}

export const initialAppState: IAppState = {
  users: initialUserState,
  photos: initialPhotoState,
  auth: initialAuthState,
}

export const getInitialState = () => initialAppState;