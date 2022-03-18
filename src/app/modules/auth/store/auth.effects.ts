import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { IAuthError, IUserLoginData } from 'src/app/modules/auth/store/auth.interface';
import { AuthService } from 'src/app/services/auth.service';
import {
  AuthIsFetching,
  EAuthActions,
  Login,
  LoginFailure,
  LoginSuccess,
  Registration,
  RegistrationFailure,
  RegistrationSuccess,
} from './auth.actions';
import { IAppState } from '../../../store/states/app.state';

@Injectable()
export class AuthEffects {
  constructor(
    private authService: AuthService,
    private actions$: Actions,
    private store: Store<IAppState>
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType<Login>(EAuthActions.LOGIN),
      switchMap((action) => {
        this.store.dispatch(new AuthIsFetching(true));
        return this.authService.login(action.payload).pipe(
          map((req: IUserLoginData) => {
            this.store.dispatch(new AuthIsFetching(false));
            return new LoginSuccess(req);
          }),
          catchError((err: IAuthError) => {
            this.store.dispatch(new AuthIsFetching(false));
            return of(new LoginFailure(err));
          })
        );
      })
    );
  });

  registartion$ = createEffect(() => {
    return this.actions$.pipe(
      ofType<Registration>(EAuthActions.REGISTRATION),
      switchMap((action) => {
        this.store.dispatch(new AuthIsFetching(true));
        return this.authService.registration(action.payload).pipe(
          map((req) => {
            this.store.dispatch(new AuthIsFetching(false));
            return new RegistrationSuccess({
              ...req,
              registrateIsSuccess: true,
            });
          }),
          catchError((err: IAuthError) => {
            this.store.dispatch(new AuthIsFetching(false));
            return of(new RegistrationFailure(err));
          })
        );
      })
    );
  });
}
