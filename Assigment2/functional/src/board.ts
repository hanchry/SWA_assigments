

export type Generator<T> = { next: () => T }

export type Position = {
    row: number,
    col: number
}

export type Match<T> = {
    matched: T,
    positions: Position[]
}

export type Board<T> = {
    width: number,
    height: number,
    symbols: Symbol<T>[]
};

export type Symbol<T> = {
    symbol: T,
    position: Position
}

export type Effect<T> = {
    kind: string,
    match: Match<T>
};
;

export type MoveResult<T> = {
    board: Board<T>,
    effects: Effect<T>[]
}

export function positions(board: Board<String>) {
    let result: Position[] = [];
    for (let symbol of board.symbols) {
        result.push(symbol.position);
    }
    return result;
}

export function create<T>(generator: Generator<T>, width: number, height: number): Board<T> {
    this.generator = {
        next: () => generator.next()
    };
    this.board = {
        width: width,
        height: height,
        symbols: generateSymbols(this.generator, width, height)
    };
    return this.board;
}

export function piece<T>(board: Board<T>, p: Position): T | undefined {
    return board.symbols.find(s => s.position.row === p.row && s.position.col === p.col)?.symbol;
}

export function canMove<T>(board: Board<T>, first: Position, second: Position): boolean {
    let l1 = piece(board, first);
    let l2 = piece(board, second);
    let outOfBounds = l1 === undefined || l2 === undefined;

    let diffRowColumn = first.row !== second.row && first.col !== second.col;

    if (outOfBounds || diffRowColumn) {
        return false;
    }
    return checkVerticalMatch(board, first, second) || checkVerticalMatch(board, second, first)
        || checkHorizontalMatch(board, first, second) || checkHorizontalMatch(board, second, first);

}

export function move<T>(generator: Generator<T>, board: Board<T>, first: Position, second: Position): MoveResult<T> {
    let effects: Effect<T>[] = [];
    let result = {board: board, effects: effects};

    if (canMove(board, first, second)) {
        //switch letters
        let temp = piece(board, first);
        board.symbols.find(s => s.position.row === first.row && s.position.col === first.col)!.symbol = piece(board, second)!;
        board.symbols.find(s => s.position.row === second.row && s.position.col === second.col)!.symbol = temp!;

        //find matches
        effects = findMatch(board);

        let refillResult = refill(board, generator, effects);

        result.board = refillResult.board;
        result.effects = refillResult.effects;
    }

    return result;
}

export function refill<T>(board: Board<T>, generator: Generator<T>, effects:Effect<T>[]): MoveResult<T> {
    effects.forEach(e => {
        e.match.positions.forEach(p => {
            // @ts-ignore
            board.symbols.find(s => s.position.row === p.row && s.position.col === p.col)!.symbol = '';
        });
    });

    while (board.symbols.find(s => s.symbol === '') !== undefined) {
        let loopLimit = 500;
        if (loopLimit === 0) {
            break;
        }
        loopLimit--;

        let emptyPositions = board.symbols.filter(s => s.symbol === '').map(s => s.position);
        emptyPositions.forEach(p => {
            if (p.row > 0) {
                let symbol = piece(board, {row: p.row - 1, col: p.col});
                if (symbol !== undefined) {
                    board.symbols.find(s => s.position.row === p.row && s.position.col === p.col)!.symbol = symbol!;
                    // @ts-ignore
                    board.symbols.find(s => s.position.row === p.row - 1 && s.position.col === p.col)!.symbol = '';
                }
            } else {
                board.symbols.find(s => s.position.row === p.row && s.position.col === p.col)!.symbol = generator.next();
            }
        })
    }

    // if(findMatch(board) !== undefined){
    //     return refill(board, generator, effects);
    // }

    effects.push({
        kind: 'Refill',
        match:
            {
                // @ts-ignore
                matched: '',
                positions: []
            }
    })
    return {board: board, effects: effects};
}


export function generateSymbols<T>(generator: Generator<T>, width: number, height: number): Symbol<T>[] {
    let result: Symbol<T>[] = [];
    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            result.push({
                symbol: generator.next(),
                position: {row: row, col: col}
            });
        }
    }
    return result;
}


export function checkVerticalMatch<T>(board: Board<T>, position: Position, target: Position): boolean {
    let letter = piece(board, position);
    let arround = [
        {row: target.row - 1, col: target.col},
        {row: target.row + 1, col: target.col}
    ];
    let up = [
        {row: target.row - 2, col: target.col},
        {row: target.row - 1, col: target.col}
    ]
    let down = [
        {row: target.row + 1, col: target.col},
        {row: target.row + 2, col: target.col}
    ]

    let directions = [up, down, arround];
    for (let direction of directions) {
        let match = 0;
        for (let p of direction) {
            if (p.row !== position.row || p.col !== position.col) {
                let symbol = piece(board, p);
                if (symbol === letter) {
                    match++;
                }
            }
        }
        if (match === 2) {
            return true;
        }
    }
    return false;
}

export function checkHorizontalMatch<T>(board: Board<T>, position: Position, target: Position): boolean {
    let letter = piece(board, position);
    let arround = [
        {row: target.row, col: target.col - 1},
        {row: target.row, col: target.col + 1}
    ];
    let left = [
        {row: target.row, col: target.col - 2},
        {row: target.row, col: target.col - 1}
    ]
    let right = [
        {row: target.row, col: target.col + 1},
        {row: target.row, col: target.col + 2}
    ]

    let directions = [left, right, arround];
    for (let direction of directions) {
        let match = 0;
        for (let p of direction) {
            if (p.row !== position.row || p.col !== position.col) {
                let symbol = piece(board, p);
                if (symbol === letter) {
                    match++;
                }
            }
        }
        if (match === 2) {
            return true;
        }
    }
    return false;
}

export function findMatch<T>(board: Board<T>): Effect<T>[] {
    let results: Effect<T>[] = [];
    for (let symbol of board.symbols) {
        let position = symbol.position;
        let target = piece(board, position);
        let horizontal = [
            {row: position.row, col: position.col + 1},
            {row: position.row, col: position.col + 2},
        ]
        let vertical = [
            {row: position.row + 1, col: position.col},
            {row: position.row + 2, col: position.col},
        ]
        let directions = [horizontal, vertical];
        for (let direction of directions) {
            let match = 0;
            for (let p of direction) {
                let symbol = piece(board, p);
                if (symbol === target) {
                    match++;
                }
            }
            if (match === 2) {
                results.push({
                    kind: "Match",
                    match: {
                        matched: target,
                        positions: [position, direction[0], direction[1]]
                    }
                });
            }
        }
    }
    return results;
}

export function match<T>(generator: Generator<T>, board: Board<T>, positions: Position[]): Board<T> {
    for (let symbol of board.symbols) {
        if (positions.some(p => p.row === symbol.position.row && p.col === symbol.position.col)) {
            symbol.symbol = generator.next();
        }
    }
    let effect = findMatch(board)
    if (effect.length > 0) {
        return match(generator, board, positions);
    }
    return board;
}

