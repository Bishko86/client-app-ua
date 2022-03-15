import { RouterReducerState } from "@ngrx/router-store";
import { initialUserState, IUserState } from "../state/user.state";
import { IConfigState, initialConfigState } from "./config.state";
import { initialPhotoState, IPhotoState } from "./photo.state";

export interface IAppState {
    router?: RouterReducerState;
    users: IUserState;
    config: IConfigState;
    photos: IPhotoState;
}

export const initialAppState: IAppState = {
    users: initialUserState,
    config: initialConfigState,
    photos: initialPhotoState,
}

export const getInitialState = () => initialAppState;