import {User} from "../../types/User";
import {UserEnums} from "../enums/UserEnums";

export interface ScoreState {

}

const initialState: ScoreState = {

}

const scoreReducer = (state: ScoreState = initialState, action: any) => {
    switch (action.type) {
        case UserEnums.GET_USER_REQUEST:
            return {
                ...state,
            }
        case UserEnums.GET_USER_SUCCESS:
            return {
                ...state,
            }
        case UserEnums.GET_USER_FAILURE:
            return {
                ...state,
            }
        case UserEnums.UPDATE_USER_REQUEST:
            return {
                ...state,
            }
        case UserEnums.UPDATE_USER_SUCCESS:
            return {
                ...state,
            }
        case UserEnums.UPDATE_USER_FAILURE:
            return {
                ...state,
            }
        default:
            return state;

    }
}

export default scoreReducer;