import {Board} from "../../game/functional/src/board";


export interface BoardState {
    board: Board<String>;
}

const initialState: BoardState = {
    board: {
        width: 0,
        height: 0,
        symbols: [],
    }
}

const boardReducer = (state: BoardState = initialState, action: any) => {
    switch (action.type) {
        case "Move_Piece_Request":
            return {
                ...state,
            }
        case "Move_Piece_Success":
            return {
                ...state,
                board: action.payload
            }
        case "Move_Piece_Failure":
            return {
                ...state,
                error: action.payload
            }
        case "Create_Board":
            return {
                ...state,
                board: action.payload
            }
        default:
            return state;

    }
}

export default boardReducer;