import { initialPhotoState, IPhotoState } from "../states/photo.state";
import { EPhotoActions, PhotosAction } from "../actions/photo.actions"

export const photosReducer = (
    state = initialPhotoState,
    action: PhotosAction
):IPhotoState => {
    switch(action.type) {
        case EPhotoActions.GET_PHOTOS_SUCCESS:
            return {
                ...state,
                photos: [...state.photos, ...action.payload]
            }
        case EPhotoActions.GET_PHOTOS_NEXT_PAGE:
            return {
                ...state,
                page: action.payload
            }
            case EPhotoActions.PHOTO_IS_FETCHING:
            return {
                ...state,
                loading: action.payload
            }
            default:
                return state
    }

}