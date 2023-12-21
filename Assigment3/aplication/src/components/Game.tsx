import * as Board from "../game/functional/src/board";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState, useRef} from "react";
import GameItem from "./GameItem";
import {createBoard} from "../state/actions/BoardAction";
import {Position} from "../game/functional/src/board";
import {postScore} from "../state/actions/ScoreActions";
import {Score} from "../types/Score";

const Game = () => {
    const selectBoard = useSelector((state: any) => state.boardReducer.board);
    const dispatch = useDispatch();
    const [localBoard, setLocalBoard] = useState(selectBoard);

    const updateNewBoard = (updatedBoard: Board.Board<any>) => {
        setLocalBoard(updatedBoard);
    };

    const [score, setScore] = useState(0);
    const scoreRef = useRef(score);

    const increaseScore = () => {
        setScore((prevScore) => {
            const newScore = prevScore + 1;
            scoreRef.current = newScore;
            return newScore;
        });
        if(!isThereAnyMove(localBoard)){
            document.getElementById("game-com")!.style.display = "none";
            document.getElementById("result-com")!.style.display = "flex";
            saveScore();
        }
    };

    const isThereAnyMove = (board: Board.Board<any>) => {
        let moves = 0;
        for (let i = 0; i < board.height; i++) {
            for (let j = 0; j < board.width; j++) {
                if (Board.canMove(board, {row: i, col: j}, {row: i + 1, col: j})) moves++;
                if (Board.canMove(board, {row: i, col: j}, {row: i - 1, col: j})) moves++;
                if (Board.canMove(board, {row: i, col: j}, {row: i, col: j + 1})) moves++;
                if (Board.canMove(board, {row: i, col: j}, {row: i, col: j - 1})) moves++;
            }
        }
        return moves > 0;
    }

    const decreaseScore = () => {
        setScore((prevScore) => {
            const newScore = prevScore - 1;
            scoreRef.current = newScore;
            return newScore;
        });
    };

    useEffect(() => {
        if (!localBoard || localBoard.width === 0) {
            new Promise((resolve) => {
                resolve(dispatch(createBoard(3)));
            }).then((response: any) => {
                updateNewBoard(response.payload);
            });
        }

    }, [dispatch, localBoard]);

    const saveScore = async () => {

        const value: Score = {
            id: 5,
            userId: 0,
            score: scoreRef.current,
        }
        await dispatch(postScore(value) as any);

        new Promise((resolve) => {
            resolve(dispatch(createBoard(3)));
        }).then((response: any) => {
            updateNewBoard(response.payload);
        });

    }
    const onForfeit = () => {
        saveScore();
        document.getElementById("game-com")!.style.display = "none";
        document.getElementById("result-com")!.style.display = "flex";
    }
    const onPlayAgain = () => {
        document.getElementById("game-com")!.style.display = "block";
        document.getElementById("result-com")!.style.display = "none";
        setScore(0);
    }

    if (!localBoard || localBoard.width === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div id="game-com">
                <h1>Score {score}</h1>
                <button onClick={onForfeit} className="button2">Forfeit game</button>
                <div className="boardAction">
                    {[...Array(localBoard.height)].map((_, rowIndex) => (
                        <div key={rowIndex}>
                            {[...Array(localBoard.width)].map((_, columnIndex) => (
                                <div key={columnIndex}>
                                    <GameItem
                                        key={`${rowIndex}-${columnIndex}`}
                                        symbol={Board.piece(localBoard, {row: rowIndex, col: columnIndex})}
                                        position={{row: rowIndex, col: columnIndex}}
                                        gameBoard={localBoard}
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
            <div id="result-com">
                <h1>Result</h1>
                <p>Game is finished as there is no more possible moves</p>
                <p>Score: {score}</p>
                <button onClick={onPlayAgain}>play again</button>
            </div>
        </div>
    );
};

export default Game;
