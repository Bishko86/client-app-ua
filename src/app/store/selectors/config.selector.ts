import { createSelector } from "@ngrx/store";
import { IAppState } from "../states/app.state";
import { IConfigState } from "../states/config.state";

const  confugState = (state: IAppState) => state.config;
export const selectConfig = createSelector(
    confugState,
    (state: IConfigState) => state.config
)