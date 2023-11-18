import {AuthEnums} from "../enums/AuthEnums";
import {User} from "../../types/User";

export interface LoginState {
    isAuthenticated: boolean;
    user: User | null;
}

const initialState: LoginState = {
    isAuthenticated: false,
    user: null,
};

const authReducer = (state: LoginState = initialState, action: any) => {
    switch (action.type) {
        case AuthEnums.LOGIN_REQUEST:
            return {
                ...state,
                isAuthenticated: false,
            };
        case AuthEnums.LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
            };
        case AuthEnums.LOGIN_FAILURE:
            return {
                ...state,
                isAuthenticated: false,
            };
        case AuthEnums.LOGOUT_REQUEST:
            return {
                ...state,
                isAuthenticated: true,
            }
        case AuthEnums.LOGOUT_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            }
        case AuthEnums.LOGOUT_FAILURE:
            return {
                ...state,
                isAuthenticated: true,
            }
        case AuthEnums.REGISTER_REQUEST:
            return {
                ...state,
                isAuthenticated: false,
            }
        case AuthEnums.REGISTER_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
            }
        case AuthEnums.REGISTER_FAILURE:
            return {
                ...state,
                isAuthenticated: false,
            }
        default:
            return state;
    }
};

export default authReducer;
