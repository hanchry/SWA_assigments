import * as Board from "../game/functional/src/board";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {CyclicGenerator} from "../game/functional/src/generator";
import {Position} from "../game/functional/src/board";
import GameItem from "./GameItem";

const Game = () => {

    const dispatch = useDispatch();
    const [board, setBoard] = useState<Position[]>([]);

    const generator = new CyclicGenerator('ABC');
    const newBoard = Board.create(generator, 3, 3);

    useEffect(() => {

        setBoard(Board.positions(newBoard));
        // board.map((value, index, array) => () => {
        //     console.log(value);
        // })
    }, [dispatch]);


    return (
        <div>
            <h1>Game</h1>
            <div className="board">
                {[...Array(newBoard.height)].map((_, rowIndex) => (
                    <div key={rowIndex}>
                        {[...Array(newBoard.width)].map((_, columnIndex) => (
                            <GameItem
                                key={`${rowIndex}-${columnIndex}`}
                                symbol={Board.piece(newBoard, { row: rowIndex, col: columnIndex })}
                                position={{ row: rowIndex, col: columnIndex }}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Game;