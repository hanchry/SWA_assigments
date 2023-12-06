import React, {useState, useRef, useEffect} from 'react';
import {Position, Symbol} from '../game/functional/src/board';
import * as Board from "../game/functional/src/board";
import {useDispatch} from "react-redux";
import {movePiece} from "../state/actions/BoardAction";


const GameItem = (data:any) => {
    const dispatch = useDispatch();

    const props = {
        symbol: data.symbol,
        position: data.position,
    }

    let widthDevider = 2 + ((data.gameBoard.width-1) * 0.1);
    let heightDevider = 2 + ((data.gameBoard.height-1) * 0.1);

    const spacing = 60;

    const [pos, setPos] = useState({ row:(props.position.row * spacing) + window.innerHeight/heightDevider, col:(props.position.col * spacing) + window.innerWidth/widthDevider});
    const [lastPos, setLastPos] = useState({ row:(props.position.row * spacing) + window.innerHeight/heightDevider, col:(props.position.col * spacing) + window.innerWidth/widthDevider} );

    const [clicked, setClicked] = useState(false);
    const [initialX, setInitialX] = useState(0);
    const [initialY, setInitialY] = useState(0);
    const itemRef = useRef(null);


    const handleMouseDown = (e:any) => {
        e.preventDefault();
        setClicked(true);
        setInitialX(e.clientX - 10);
        setInitialY(e.clientY - 10);
        document.addEventListener('mouseup', handleMouseUp)
    };

    const handleMouseMove = (e:any) => {
        if (!clicked) return;

        const mewX = e.clientX -10 ;
        const mewY = e.clientY -10 ;

        if((initialX < mewX - 5 || initialX > mewX + 5)){
            setPos({ row: pos.row, col: mewX})
        }
        else{
            setPos({ row: mewY, col: pos.col})
        }

    };

    const handleMouseUp = () => {
        if(!clicked) return;

        move();

        setClicked(false);
        document.removeEventListener('mouseup', handleMouseUp)
    };

    const move = () => {
        let from:Position = { row: 0, col: 0 };
        let to:Position = { row: 0, col: 0 };
        if ( pos.col - initialX > spacing/3) {
            from = { row: props.position.row, col: props.position.col };
            to = { row: props.position.row, col: props.position.col + 1};
        }
        else if ( initialX - pos.col > spacing/3) {
            from = { row: props.position.row, col: props.position.col };
            to = { row: props.position.row, col: props.position.col - 1};
        }
        else if ( pos.row - initialY > spacing/3) {
            from = { row: props.position.row, col: props.position.col };
            to = { row: props.position.row + 1, col: props.position.col};
        }
        else if ( initialY - pos.row > spacing/3) {
            from = { row: props.position.row, col: props.position.col };
            to = { row: props.position.row - 1, col: props.position.col};
        }
        else {
            setPos(lastPos)
            return;
        }

        const result = dispatch(movePiece(from, to,) as any)

        if(result.type === "Move_Piece_Success"){
            let element1 = document.getElementById(`${to.row}-${to.col}`);
            let element2 = document.getElementById(`${from.row}-${from.col}`);

            if (element1 && element2) {
                element2.id = `${to.row}-${to.col}`;
                element1.id = `${from.row}-${from.col}`;

                const newX = element1.style.left;
                const newY = element1.style.top;
                newX.replace('px', '');
                newY.replace('px', '');

                element1.style.left = lastPos.col + 'px';
                element1.style.top = lastPos.row + 'px';

                setPos({ row: parseInt(newY), col: parseInt(newX) })

                console.log(result.payload)
                data.refreshCallback();
            }
        }
    };

    return (
        <p
            id={`${props.position.row}-${props.position.col}`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            style={{
                margin: '10px',
                fontSize: '20px',
                position: 'absolute',
                top: `${pos.row}px`,
                left: `${pos.col}px`,
                transform: 'translate(-50%, -50%)', // Adjust the transform to center the element
                cursor: 'pointer',
                userSelect: 'none',
            }}
            ref={itemRef}
        >
            {props.symbol}
        </p>
    );
};

export default GameItem;
