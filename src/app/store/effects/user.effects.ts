import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import {
  EUserActions,
  GetUser,
  GetUserFailure,
  GetUserIsFailed,
  GetUsers,
  GetUsersSuccess,
  GetUserSuccess,
} from '../actions/user.actions';
import { IAppState } from '../states/app.state';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { selectUserList } from '../selectors/user.selector';
import { of } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Injectable()
export class UserEffects {
  constructor(
    private _userService: UserService,
    private _actions: Actions,
    private _store: Store<IAppState>
  ) {}

  getUsers$ = createEffect(() => {
    return this._actions.pipe(
      ofType<GetUsers>(EUserActions.GET_USERS),
      switchMap(() => this._userService.getUsers()),
      switchMap((userHttp: any) => {
        return of(new GetUsersSuccess(userHttp));
      }),
      catchError((e) => of(new GetUserFailure(e)))
    );
  });

  getUser$ = createEffect(() => {
    return this._actions.pipe(
      ofType<GetUser>(EUserActions.GET_USER),
      map((action) => action.payload),
      withLatestFrom(this._store.pipe(select(selectUserList))),
      switchMap(([id, users]) => {
        const selectedUser = users.find((user) => user.id === +id);
        return selectedUser
          ? of(new GetUserSuccess(selectedUser))
          : of(new GetUserIsFailed());
      })
    );
  });

}
