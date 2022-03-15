import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IConfig } from 'src/app/classes/users.interface';
import { ConfigService } from 'src/app/services/config.service';
import {
  EConfigActions,
  GetConfig,
  GetConfigSuccess,
} from '../actions/config.actions';

@Injectable()
export class ConfigEffects {
  constructor(
    private _configService: ConfigService,
    private _actions$: Actions
  ) {}

  getConfig$ = createEffect(() => {
    return this._actions$.pipe(
      ofType<GetConfig>(EConfigActions.GET_CONFIG),
      switchMap(() => this._configService.getConfig()),
      switchMap((config: IConfig) => of(new GetConfigSuccess(config)))
    );
  });
}
