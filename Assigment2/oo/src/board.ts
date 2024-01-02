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

// Defining a type BoardEvent with kind as a string and an optional match of type Match
export type BoardEvent<T> = {
    kind: 'Match' | 'Refill',
    match?: Match<T>
};

// Defining a type BoardListener as a function that takes a BoardEvent and returns any
export type BoardListener<T> = (event: BoardEvent<T>) => any;

// Defining a class Board with generic type T
export class Board<T> {
    private generator: Generator<T>;
    public width: number;
    public height: number;
    public grid: T[][];
    private listeners: BoardListener<T>[];

    // Constructor to initialize the Board class
    constructor(generator: Generator<T>, width: number, height: number) {
        this.generator = generator;
        this.height = height;
        this.width = width;
        this.grid = [];
        this.listeners = [];
        this.generateGrid();
    }
    // Private method to generate the grid using the generator
    private generateGrid() {
        for (let h = 0; h < this.height; h++) {
            let row: T[] = [];
            for (let w = 0; w < this.width; w++) {
                row.push(this.generator.next());
            }
            this.grid.push(row);
        }
    }
    // Method to add a listener to the listeners array
    addListener(listener: BoardListener<T>) {
        this.listeners.push(listener);
    }
    // Method to get a piece from the grid using a position
    piece(p: Position): T | undefined {
        if (this.posOutsideGrid(p)){
            return undefined;
        } else {
            return this.grid[p.row][p.col];
        }
    }

    // Method to get all the positions in the grid
    positions(): Position[] {
        const positions: Position[] = [];
        for (let row = 0; row < this.height; row++) {
            for (let col = 0; col < this.width; col++) {
                positions.push({row: row, col: col})
            }
        }
        return positions;
    }

    // Method to check if a move is possible between two positions
    canMove(first: Position, second: Position): boolean {
        if (this.posOutsideGrid(first) || this.posOutsideGrid(second)) {
            return false;
        }
        if (!(this.sameRow(first, second) || this.sameColumn(first, second))) {
            return false;
        }
        return this.swapAndFindMatches(first, second).length > 0;
    }

    // Private method to check if the position is outside of the grid
    private posOutsideGrid(p: Position) {
        return (p.col < 0 || p.col >= this.width) || (p.row < 0 || p.row >= this.height);
    }

    // Private method to swap positions and find matches
    private swapAndFindMatches(positionA: Position, positionB: Position): Match<T>[] {
        const gridClone = this.cloneGrid(this.grid);
        this.swapGridPositions(gridClone, positionA, positionB);
        return this.getMatches(gridClone);
    }

    // Private method to swap grid positions
    private swapGridPositions(grid: T[][], positionA: Position, positionB: Position) {
        const pieceA = grid[positionA.row][positionA.col];
        const pieceB = grid[positionB.row][positionB.col];
        grid[positionA.row][positionA.col] = pieceB;
        grid[positionB.row][positionB.col] = pieceA;
    }

    // Method to get matches in the grid
    private getMatches(grid: T[][]): Match<T>[] {
        const matchesFound = [];

        for (let rowIndex = 0; rowIndex < this.height; rowIndex++) {
            this.matchesInLine(grid, rowIndex, this.width, true, matchesFound);
        }

        for (let colIndex = 0; colIndex < this.width; colIndex++) {
            this.matchesInLine(grid, colIndex, this.height, false, matchesFound);
        }

        return matchesFound;
    }

    /* 
        Method to search for matches in a single row or column
        - grid: the game grid
        - index: the current row or column index
        - limit: the width or height of the grid
        - isRow: a boolean indicating whether to search in a row or column
        - matchesFound: an array to store the matches found
    */
    private matchesInLine(grid: T[][], index: number, limit: number, isRow: boolean, matchesFound: Match<T>[]) {
        let positions: Position[] = [];
        for (let j = 0; j < limit - 1; j++) {
            // Determine the current and next items based on whether we are searching in a row or column
            const currentItem = isRow ? grid[index][j] : grid[j][index];
            const nextItem = isRow ? grid[index][j + 1] : grid[j + 1][index];

            // If the current item is equal to the next item, add their positions to the positions array
            if (currentItem === nextItem) {
                if (positions.length === 0)
                    positions.push({ row: isRow ? index : j, col: isRow ? j : index });
                positions.push({ row: isRow ? index : j + 1, col: isRow ? j + 1 : index });

                // If three consecutive items are matched, add them to the matchesFound array
                if (positions.length === 3) {
                    matchesFound.push({
                        matched: this.piece(positions[0]),
                        positions: positions,
                    });
                    positions = [];
                }
            } else {
                positions = [];
            }
        }
    }


    private cloneGrid(grid: T[][]) {
        const newGrid = [];
        for (let h = 0; h < grid.length; h++) {
            let row: T[] = [];
            for (let w = 0; w < grid[0].length; w++) {
                row.push(grid[h][w]);
            }
            newGrid.push(row);
        }
        return newGrid;
    }

    private sameRow(first: Position, second: Position) {
        return first.row === second.row;
    }

    private sameColumn(first: Position, second: Position) {
        return first.col === second.col;
    }

    move(first: Position, second: Position) {
        if (!this.canMove(first, second)){
            return;
        }

        this.swapGridPositions(this.grid, first, second);

        this.checkAndHandleMatch();
    }

    private checkAndHandleMatch() {
        const matches = this.getMatches(this.grid);
        if (matches.length === 0)
            return;
        for (let match of matches) {
            this.fireEvent({
                kind: "Match",
                match
            });
            this.removePositions(match.positions);
        }

        this.refreshPositions();
        this.fireEvent({
            kind: "Refill"
        });
        this.checkAndHandleMatch();
    }

    private removePositions(positions: Position[]) {
        for (let position of positions) {
            this.grid[position.row][position.col] = null
        }
    }

    private takeNumberAbove(position: Position): T| null {
        for (let r = position.row - 1; r >= 0; r--) {
            const value = this.grid[r][position.col];
            if (value) {
                this.grid[r][position.col] = null;
                return value;
            }
        }
        return null;
    }

    private refreshPositions() {
        for (let h = this.height - 1; h >= 0; h--) {
            for (let w = 0; w < this.width; w++) {
                if (!this.piece({row: h, col: w}))
                    this.grid[h][w] = this.takeNumberAbove({row: h, col: w});
            }
        }

        for (let h = this.height - 1; h >= 0; h--) {
            for (let w = 0; w < this.width; w++) {
                const piece = this.piece({row: h, col: w});
                if (!piece)
                    this.grid[h][w] = this.generator.next();
            }
        }
    }

    private fireEvent(event: BoardEvent<T>) {
        for (let listener of this.listeners) {
            listener(event);
        }
    }
}
