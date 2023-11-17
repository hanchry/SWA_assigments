import {LoginEnums} from "../enums/LoginEnums";
import {User} from "../../types/User";

interface LoginState {
    isLoading: boolean;
    isAuthenticated: boolean;
    user: User | null;
    error: string | null;
}

const initialState: LoginState = {
    isLoading: false,
    isAuthenticated: false,
    user: null,
    error: null,
};

const loginReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case LoginEnums.LOGIN_REQUEST:
            return {
                ...state,
                isLoading: true,
                isAuthenticated: false,
                error: null,
            };
        case LoginEnums.LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                user: action.payload,
                error: null,
            };
        case LoginEnums.LOGIN_FAILURE:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default loginReducer;