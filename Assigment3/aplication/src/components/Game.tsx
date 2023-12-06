import * as Board from "../game/functional/src/board";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import GameItem from "./GameItem";
import { createBoard } from "../state/actions/BoardAction";
import { Position } from "../game/functional/src/board";

const Game = () => {
    const dispatch = useDispatch();
    const [boardAction, setBoard] = useState<Position[]>([]);
    const newBoard = useSelector((state: any) => state.boardReducer.board);
    console.log("GAME ", newBoard)

    useEffect(() => {
        if (!newBoard || newBoard.width === 0) {
            dispatch(createBoard(3) as any);
        } else {
            setBoard(Board.positions(newBoard));
        }
    }, [dispatch, newBoard]);

    if (!newBoard || newBoard.width === 0) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <h1>Game</h1>
            <div className="boardAction">
                {[...Array(newBoard.height)].map((_, rowIndex) => (
                    <div key={rowIndex}>
                        {[...Array(newBoard.width)].map((_, columnIndex) => (
                            <div key={columnIndex}>
                                <GameItem
                                    key={`${rowIndex}-${columnIndex}`}
                                    symbol={Board.piece(newBoard, { row: rowIndex, col: columnIndex })}
                                    position={{ row: rowIndex, col: columnIndex }}
                                    gameBoard={newBoard}
                                    refreshCallback={() => setBoard(Board.positions(newBoard))}
                                />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Game;
