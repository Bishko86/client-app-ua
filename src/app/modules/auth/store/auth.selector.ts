import { createSelector } from '@ngrx/store';
import { IAppState } from '../../../store/states/app.state';
import { IAuthState } from './auth.state';

const selectAuth = (state: IAppState) => state.auth;

export const selectAuthIsFetching = createSelector(
  selectAuth,
  (state: IAuthState) => state.isFetching
);

export const selectAuthIsLoggedIn = createSelector(
  selectAuth,
  (state: IAuthState) => state.isLoggedIn
);

export const selectUserAuthData = createSelector(
  selectAuth,
  (state: IAuthState) => state.userAuthData
);

export const selectLoginError = createSelector(
  selectAuth,
  (state: IAuthState) => state.loginError
);

export const selectRegistrateError = createSelector(
  selectAuth,
  (state: IAuthState) => state.registrateError
);

export const selectRegistrateResult = createSelector(
  selectAuth,
  (state: IAuthState) => state.registrateResult
);
