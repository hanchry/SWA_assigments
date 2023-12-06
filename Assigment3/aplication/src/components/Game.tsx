import * as Board from "../game/functional/src/board";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import GameItem from "./GameItem";
import {createBoard} from "../state/actions/BoardAction";
import {Position} from "../game/functional/src/board";


const Game = () => {
    const dispatch = useDispatch();
    const [score, setScore] = useState(0);
    const [newBoard, setNewBoard] = useState(
        useSelector((state: any) => state.boardReducer.board)
    );

    const updateNewBoard = (updatedBoard: Board.Board<any>) => {
        setNewBoard(updatedBoard);
    };

    const increaseScore = () => {
        setScore(score + 1);
    };

    const decreaseScore = () => {
        setScore(score - 1);
    };

    useEffect(() => {
        if (!newBoard || newBoard.width === 0) {
            // Wrap the dispatch call in a Promise
            new Promise((resolve) => {
                resolve(dispatch(createBoard(3)));
            }).then((response: any) => {
                updateNewBoard(response.payload);
                setScore(0);
            });
        }
    }, [dispatch, newBoard]);

    if (!newBoard || newBoard.width === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Score {score}</h1>
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
                                    refreshCallback={updateNewBoard}
                                    increaseScore={increaseScore}
                                    decreaseScore={decreaseScore}
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