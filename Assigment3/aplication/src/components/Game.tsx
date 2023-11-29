import * as Board from "../game/functional/src/board";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {CyclicGenerator} from "../game/functional/src/generator";
import {Position} from "../game/functional/src/board";

const Game = () => {
    const dispatch = useDispatch();
    const [board, setBoard] = useState<Position[]>([]);

    const generator = new CyclicGenerator('ABC');
    const newBoard = Board.create(generator, 5, 5);

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
                {board.map((value, index, array) => (
                    <div key={index}>
                        <p>Value: {Board.piece(newBoard,value)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Game;