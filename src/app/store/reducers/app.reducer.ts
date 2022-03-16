import { routerReducer } from "@ngrx/router-store";
import { ActionReducerMap } from "@ngrx/store";
import { IAppState } from "../states/app.state";
import { authReducer } from "../../modules/auth/store/auth.reducer";
import { photosReducer } from "../../modules/gallery/store/photos.reducer";
import { userReducer } from "./user.reducer";

export const appReducer: ActionReducerMap<IAppState, any> = {
    router: routerReducer,
    users: userReducer,
    photos: photosReducer,
    auth: authReducer
}