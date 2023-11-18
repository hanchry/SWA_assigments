import {UserEnums} from "../enums/UserEnums";
import {User} from "../../types/User";

export interface UserState {
    user: User;
}

const initialState: UserState = {
    user: {
        id: 0,
        username: "",
        password: "",
        token: "",
        admin: false,
    }
}

const userReducer = (state: UserState = initialState, action: any) => {
    switch (action.type) {
        case UserEnums.GET_USER_REQUEST:
            return {
                ...state,
            }
        case UserEnums.GET_USER_SUCCESS:
            return {
                ...state,
                user: action.payload,
            }
        case UserEnums.GET_USER_FAILURE:
            return {
                ...state,
            }
        default:
            return state;

    }
}

export default userReducer;