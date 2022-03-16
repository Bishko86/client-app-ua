import { routerReducer } from "@ngrx/router-store";
import { ActionReducerMap } from "@ngrx/store";
import { IAppState } from "../states/app.state";
import { authReducer } from "./auth.reducer";
import { configReducer } from "./config.reducer";
import { photosReducer } from "./photos.reducer";
import { userReducer } from "./user.reducer";

export const appReducer: ActionReducerMap<IAppState, any> = {
    router: routerReducer,
    users: userReducer,
    config: configReducer,
    photos: photosReducer,
    auth: authReducer
}