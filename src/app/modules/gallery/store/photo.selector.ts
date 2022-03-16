import { createSelector } from "@ngrx/store";
import { IAppState } from "../../../store/states/app.state";
import { IPhotoState } from "./photo.state";

const selectPhotos = (state: IAppState) => state.photos;

export const selectPhotoList = createSelector(
    selectPhotos,
    (state: IPhotoState) => state.photos
);
export const selectPhotoListPage = createSelector(
    selectPhotos,
    (state: IPhotoState) => state.page
);
export const selectPhotoListlimit = createSelector(
    selectPhotos,
    (state: IPhotoState) => state.limit
);

export const selectPhotoIsFetching = createSelector(
    selectPhotos,
    (state: IPhotoState) => state.loading
);