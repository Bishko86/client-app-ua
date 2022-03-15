import { EUserActions, UserActions } from '../actions/user.actions';
import { initialUserState, IUserState } from '../state/user.state';

export const userReducer = (
  state = initialUserState,
  action: UserActions
): IUserState => {
  switch (action.type) {

    case EUserActions.GET_USERS_SUCCESS:
      return {
        ...state,
        users: [...state.users, ...action.payload],
      };

    case EUserActions.GET_USER_SUCCESS:
      return {
        ...state,
        selectedUser: action.payload,
      };
      case EUserActions.GET_USER_FAILURE:
          return {
              ...state,
              error: {
                  isError: true,
                error: action.payload},
          }
          case EUserActions.GET_USER_IS_FAILED:
            return state
            
    default:
      return state;
  }
};
