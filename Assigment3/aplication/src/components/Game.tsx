import * as Board from "../game/functional/src/board";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState, useRef} from "react";
import GameItem from "./GameItem";
import {createBoard} from "../state/actions/BoardAction";
import {Position} from "../game/functional/src/board";
import {postScore} from "../state/actions/ScoreActions";
import {Score} from "../types/Score";

const Game = () => {
    const dispatch = useDispatch();
    const [newBoard, setNewBoard] = useState(
        useSelector((state: any) => state.boardReducer.board)
    );

    const updateNewBoard = (updatedBoard: Board.Board<any>) => {
        setNewBoard(updatedBoard);
    };

    const [score, setScore] = useState(0);
    const scoreRef = useRef(score);

    const increaseScore = () => {
        setScore((prevScore) => {
            const newScore = prevScore + 1;
            scoreRef.current = newScore;
            return newScore;
        });
    };

    const decreaseScore = () => {
        setScore((prevScore) => {
            const newScore = prevScore - 1;
            scoreRef.current = newScore;
            return newScore;
        });
    };

    useEffect(() => {
        if (!newBoard || newBoard.width === 0) {
            new Promise((resolve) => {
                resolve(dispatch(createBoard(3)));
            }).then((response: any) => {
                updateNewBoard(response.payload);
            });
        }

        return () => {
            if (scoreRef.current > 0) {
                saveScore();
            }
        };
    }, [dispatch, newBoard]);

    const saveScore = async () => {

        const value: Score = {
            id: 5,
            userId: 0,
            score: scoreRef.current,
        }
        await dispatch(postScore(value) as any);

    }

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
                                    symbol={Board.piece(newBoard, {row: rowIndex, col: columnIndex})}
                                    position={{row: rowIndex, col: columnIndex}}
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
