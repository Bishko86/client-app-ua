import { IUserDto } from "src/app/classes/userDto.interface";

export interface IError {
    isError: boolean;
    error: Error | null;
  }

export interface IUserState {
    users: IUserDto[];
    selectedUser: IUserDto | null;
    error: IError
}

export const initialUserState: IUserState = {
    users: [],
    selectedUser: null,
    error: {
        isError: false,
        error: null
    }
}