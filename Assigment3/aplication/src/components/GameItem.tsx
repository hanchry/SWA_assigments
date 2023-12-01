import React, {useState, useRef, useEffect} from 'react';
import { Symbol } from '../game/functional/src/board';

const GameItem = (props:Symbol<any>) => {
    const [pos, setPos] = useState({ row:props.position.row * 50, col:props.position.col * 50 });
    const [clicked, setClicked] = useState(false);
    const itemRef = useRef(null);


    const handleMouseDown = (e:any) => {
        setClicked(true);
    };

    const handleMouseMove = (e:any) => {
        if (!clicked) return;

        const mewX = e.clientX - 647;

        if (mewX < 0 || mewX > 100) return;

        setPos({ row: pos.row, col: mewX})
    };

    const handleMouseUp = () => {
        setClicked(false);
    };

    return (
        <p
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            style={{
                margin: '10px',
                fontSize: '20px',
                position: 'absolute',
                top: `${pos.row}px`,
                left: `${pos.col}px`,
                transform: 'translate(-350%, -350%)', // Adjust the transform to center the element
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
