import { IPhoto } from 'src/app/classes/photo.inteface';

export interface IPhotoState {
  photos: IPhoto[];
  page: number;
  limit:number;
  loading: boolean
}

export const initialPhotoState: IPhotoState = {
  photos: [],
  page: 0,
  limit: 9,
  loading: false,
};
