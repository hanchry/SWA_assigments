import { LoginEnums } from "../enums/LoginEnums";
import { User } from "../../types/User";

export interface LoginState {
    isAuthenticated: boolean;
    user: User | null;
}

const initialState: LoginState = {
    isAuthenticated: false,
    user: null,
};

const loginReducer = (state: LoginState = initialState, action: any) => {
    switch (action.type) {
        case LoginEnums.LOGIN_REQUEST:
            return {
                ...state,
                isAuthenticated: false,
            };
        case LoginEnums.LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
            };
        case LoginEnums.LOGIN_FAILURE:
            return {
                ...state,
                isAuthenticated: false,
            };
        default:
            return state;
    }
};

export default loginReducer;
