import { IConfig } from "src/app/classes/users.interface";

export interface IConfigState {
    config: IConfig | null;
}

export const initialConfigState: IConfigState = {
    config: null,
}