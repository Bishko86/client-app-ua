import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { of } from "rxjs";
import { switchMap, withLatestFrom } from "rxjs/operators";
import { IPhoto } from "src/app/classes/photo.inteface";
import { PhotoService } from "src/app/services/photo.service";
import { EPhotoActions, GetPhotos, GetPhotosSuccess, PhotoIsFetching } from "../actions/photo.actions";
import { selectPhotoListlimit, selectPhotoListPage } from "../selectors/photo.selector";
import { IAppState } from "../states/app.state";

@Injectable()
export class PhotoEffects {
    constructor(
      private _actions: Actions,
      private _photoService: PhotoService,
      private _store: Store<IAppState>
    ){}

    getPhotos$ = createEffect(() => {
      return this._actions.pipe(
        ofType<GetPhotos>(EPhotoActions.GET_PHOTOS),
        withLatestFrom(this._store.pipe(select(selectPhotoListPage)), this._store.pipe(select(selectPhotoListlimit))),
        switchMap(([r, page, limit]) => {
          this._store.dispatch(new PhotoIsFetching(true))
          return this._photoService.getPhoto(page, limit)}),
        switchMap((photos: IPhoto[]) => {
          this._store.dispatch(new PhotoIsFetching(false))
          return of(new GetPhotosSuccess(photos));
        }),
      )
    })
}