import { ConfigActions, EConfigActions } from "../actions/config.actions";
import { IConfigState, initialConfigState } from "../states/config.state";

export const configReducer = (
    state = initialConfigState,
    action: ConfigActions
): IConfigState => {
    switch (action.type){
        case EConfigActions.GET_CONFIG_SUCCESS:
            return {
                ... state,
                config: action.payload,
            }
        default:
            return state;
    }
}