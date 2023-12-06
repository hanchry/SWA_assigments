import {CyclicGenerator} from "../../game/functional/src/generator";
import * as Board from "../../game/functional/src/board";
import {type} from "os";
import {Position} from "../../game/functional/src/board";
import {useDispatch} from "react-redux";

const generator = new CyclicGenerator('ABCCABACAC');
let board:Board.Board<any>;

export const boardMoveRequest = () => ({
    type: "Move_Piece_Request",
});
export const boardMoveSuccess = (board:Board.Board<any>) => ({
    type: 'Move_Piece_Success',
    payload: board,
});
export const boardMoveFailure = () => ({
    type: 'Move_Piece_Failure',
    payload: "Move Failed",
});
export const boardCreate = (board:Board.Board<any>) => ({
    type: 'Create_Board',
    payload: board,
});


export const createBoard = (size:number) => {
    board = Board.create( generator, size, size);
    return boardCreate(board);
}
export const movePiece = (from:Position, to:Position) => {
    const canMove = Board.canMove(board, from, to);
    if(canMove){
        const result = Board.move(generator,board, from, to);
        board = result.board;
        return boardMoveSuccess(board);
    }
    return boardMoveFailure();
}