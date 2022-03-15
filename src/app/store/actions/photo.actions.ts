import { Action, createAction, props } from '@ngrx/store';
import { IPhoto } from 'src/app/classes/photo.inteface';

export enum EPhotoActions {
  GET_PHOTOS = '[Photo] Get Photo',
  GET_PHOTOS_SUCCESS = '[Photo] Get Photo Success',
  GET_PHOTOS_NEXT_PAGE = '[Photo] Get Photos Next Page',
  PHOTO_IS_FETCHING = '[Photo] Photo Is Fetching'
}

export const getPhotos = createAction(EPhotoActions.GET_PHOTOS);

export const getPhotosSuccess = createAction(
    EPhotoActions.GET_PHOTOS_SUCCESS,
    props<{ payload: IPhoto[] }>(),
    );

    export class GetPhotos implements Action {
        public readonly type = EPhotoActions.GET_PHOTOS;
    }
    
    export class GetPhotosSuccess implements Action {
        public readonly  type = EPhotoActions.GET_PHOTOS_SUCCESS;
        constructor(public payload: IPhoto[]) {}
    }

    export class GetPhotosNextPage implements Action {
        public readonly type = EPhotoActions.GET_PHOTOS_NEXT_PAGE;
        constructor(public payload : number){}
    }

    export class PhotoIsFetching implements Action {
        public readonly type = EPhotoActions.PHOTO_IS_FETCHING;
        constructor(public payload : boolean){}
    }

    export type PhotosAction = GetPhotos | GetPhotosSuccess |  GetPhotosNextPage | PhotoIsFetching;
