import { Action, createAction } from "@ngrx/store";
import { IUserDto } from "src/app/classes/userDto.interface";

export enum EUserActions {
    GET_USERS ='[User] Get Users',
    GET_USERS_SUCCESS = '[User] Get Users Success',
    GET_USER = '[User] Get User',
    GET_USER_SUCCESS = '[User] Get User Success',
    GET_USER_FAILURE = '[User] Get User Failure',
    GET_USER_IS_FAILED = '[User] Get User Is Failed'
}

export const getUsers = createAction(
    EUserActions.GET_USERS
)

export class GetUsers implements Action {
    public readonly type = EUserActions.GET_USERS;
}

export class GetUsersSuccess implements Action {
    public readonly  type = EUserActions.GET_USERS_SUCCESS;
    constructor(public payload: IUserDto[]) {}
}

export class GetUser implements Action {
    public readonly type = EUserActions.GET_USER;
    constructor(public payload: number) {}
}

export class GetUserSuccess implements Action {
    public readonly type = EUserActions.GET_USER_SUCCESS;
    constructor(public payload: IUserDto) {}
}

export class GetUserFailure implements Action {
    public readonly type = EUserActions.GET_USER_FAILURE;
    constructor(public payload: any) {}
}
export class GetUserIsFailed implements Action {
    public readonly type = EUserActions.GET_USER_IS_FAILED;
}


export type UserActions = GetUser | GetUsers | GetUserSuccess | GetUsersSuccess | GetUserFailure | GetUserIsFailed;