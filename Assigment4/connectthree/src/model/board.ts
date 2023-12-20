export interface Game {
    user: number,
    id: number,
    board: Board<string>,
    score: number,
    nrOfMoves: number,
    targetScore: number,
    completed: boolean
}

export interface GamePlay {
    selectedPiece?: Position,
    message: string,
    matches: Position[],
    calculatingMove: boolean
}

export interface User {
    userId?: number;
    username: string;
    password: string;
    token?: string;
    isAdmin?: boolean;
    
}

export class RandomGenerator implements Generator<string> {
    private values : string[];
    private min: number;
    private max: number;
    constructor(values:string){
        this.values = values.split(",");
        this.min = 0;
        this.max = this.values.length - 1;
    }
    next(): string {
        const index = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
        return this.values[index];
    }
}


// Defining a type Generator with a next method that returns a generic type T
export type Generator<T> = { next: () => T };

// Defining a type Position with row and column as number
export type Position = {
    row: number,
    col: number
};

// Defining a type Match with matched of generic type and positions as an array of Position
export type Match<T> = {
    matched: T,
    positions: Position[]
};

// Defining a class Board with generic type T
export type Board<T> = {
    width : number,
    height : number,
    pieces: T[][],
    generator: Generator<T>;
};

// Defining a type BoardEvent with kind as a string and an optional match of type Match
export type BoardEvent<T> = {
    kind: 'Match' | 'Refill',
    match?: Match<T>
};

// Defining a type BoardListener as a function that takes a BoardEvent and returns any
export type BoardListener<T> = (event: BoardEvent<T>) => any;



export function removePositions(board: Board<string>, positions: Position[]) {
    for (let position of positions) {
        board.pieces[position.row][position.col] = null;
    }
}

export function takeNumberAbove(board: Board<string>, position: Position): string | null {
    for (let r = position.row - 1; r >= 0; r--) {
        const value = board.pieces[r][position.col];
        if (value) {
            board.pieces[r][position.col] = null;
            return value;
        }
    }
    return null;
}
export function refreshPositions(board: Board<string>, generator: Generator<string>) {
    for (let h = board.height - 1; h >= 0; h--) {
        for (let w = 0; w < board.width; w++) {
            const currentPiece = piece(board, { row: h, col: w });
            if (!currentPiece) {
                board.pieces[h][w] = takeNumberAbove(board, { row: h, col: w });
            }
        }
    }

    for (let h = board.height - 1; h >= 0; h--) {
        for (let w = 0; w < board.width; w++) {
            if (!board.pieces[h][w]) {
                board.pieces[h][w] = generator.next();
            }
        }
    }
}


export function piece<T>(board: Board<T>, p: Position): T | undefined {
    return board.pieces[p.row] ? board.pieces[p.row][p.col] : undefined
}    


export function fireEvent<T>(listeners: BoardListener<T>[], event: BoardEvent<T>) {
    for (let listener of listeners) {
        listener(event);
    }
}
/* 
    Method to search for matches in a single row or column
    - grid: the game grid
    - index: the current row or column index
    - limit: the width or height of the grid
    - isRow: a boolean indicating whether to search in a row or column
    - matchesFound: an array to store the matches found
*/export function matchesInLine(board: Board<string>, index: number, limit: number, isRow: boolean, matchesFound: Match<string>[]) {
    let positions: Position[] = [];
    for (let j = 0; j < limit - 1; j++) {
        const currentItem = isRow ? board.pieces[index][j] : board.pieces[j][index];
        const nextItem = isRow ? board.pieces[index][j + 1] : board.pieces[j + 1][index];

        if (currentItem === nextItem) {
            if (positions.length === 0)
                positions.push({ row: isRow ? index : j, col: isRow ? j : index });
            positions.push({ row: isRow ? index : j + 1, col: isRow ? j + 1 : index });

            if (positions.length === 3) {
                matchesFound.push({
                    matched: piece(board, positions[0]),
                    positions: positions,
                });
                positions = [];
            }
        } else {
            positions = [];
        }
    }
}

// Method to get matches in the grid

export function getMatches(board: Board<string>): Match<string>[] {
    const matchesFound: Match<string>[] = [];

    for (let rowIndex = 0; rowIndex < board.height; rowIndex++) {
        matchesInLine(board, rowIndex, board.width, true, matchesFound);
    }

    for (let colIndex = 0; colIndex < board.width; colIndex++) {
        matchesInLine(board, colIndex, board.height, false, matchesFound);
    }

    return matchesFound;
}


export function generateGrid<T>(generator: Generator<T>, width: number, height: number): Board<T> {
    const boardContent : T[][] = []
    for (let row = 0; row <= height -1 ; row++) {
        boardContent[row] = []
        for (let col = 0; col <= width - 1; col++) {
            boardContent[row][col] = generator.next()
        }
    }
    return {width : width, height : height, pieces : boardContent}
}    




export function checkAndHandleMatch(board: Board<string>, listeners: BoardListener<string>[], generator: Generator<string>) {
    const matches = getMatches(board);
    if (matches.length === 0) return;
    var effects : BoardEvent<string>[] = [];
    for (let match of matches) {
        /*fireEvent(listeners, {
            kind: "Match",
            match
        });*/
        effects.push({
            kind: "Match",
            match
        });
        removePositions(board, match.positions);
    }

    refreshPositions(board, generator);
    /*fireEvent(listeners, {
        kind: "Refill"
    });*/
    const nBoard1 : Board<T> = JSON.parse(JSON.stringify(board)) as typeof board;
    effects.push({
        kind: "Refill",
        board : {...nBoard1}
    });

    return {board : board, effects : effects};
}


// Method to get all the positions in the grid
export function positions(board: Board<string>): Position[] {
    const positions: Position[] = [];
    for (let row = 0; row < board.height; row++) {
        for (let col = 0; col < board.width; col++) {
            positions.push({ row: row, col: col });
        }
    }
    return positions;
}

export function canMove(first: Position, second: Position, board: Board<string>): boolean {
    if (posOutsideGrid(board, first) || posOutsideGrid(board, second)) {
        return false;
    }
    if (!(sameRow(first, second) || sameColumn(first, second))) {
        return false;
    }
    return swapAndFindMatches(board, first, second).length > 0;
}


// Private method to check if the position is outside of the grid
export function posOutsideGrid(board: Board<string>, position: Position) {
    return (position.col < 0 || position.col >= board.width) || (position.row < 0 || position.row >= board.height);
}



// Modify swapAndFindMatches function to accept a board parameter
export function swapAndFindMatches(board: Board<string>, positionA: Position, positionB: Position): Match<string>[] {
    const gridClone = cloneGrid(board.pieces);
    swapGridPositions(gridClone, positionA, positionB);
    return getMatches({ ...board, pieces: gridClone });
}

// Modify cloneGrid function to be a standalone function
export function cloneGrid(grid: string[][]): string[][] {
    return grid.map(row => [...row]);
}

// Modify swapGridPositions to be a standalone function
export function swapGridPositions(grid: string[][], positionA: Position, positionB: Position) {
    const pieceA = grid[positionA.row][positionA.col];
    const pieceB = grid[positionB.row][positionB.col];
    grid[positionA.row][positionA.col] = pieceB;
    grid[positionB.row][positionB.col] = pieceA;
}


export function sameRow(first: Position, second: Position) {
    return first.row === second.row;
}

export function sameColumn(first: Position, second: Position) {
    return first.col === second.col;
}

export function move(first: Position, second: Position, board: Board<string>, generator: Generator<string>) {
    if (!canMove(first, second, board)){
        return {board : board, effects :[]};
    }

    swapGridPositions(board.pieces, first, second);
    return checkAndHandleMatch(board, [], generator);

}

