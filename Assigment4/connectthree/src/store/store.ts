import { reactive } from 'vue';
import type { Game, GamePlay, User, Board, Position } from '../model/board';
import * as BoardModel from '../model/board';

export type Model = {
    games: Game[];
    readonly game: Readonly<Game>;
    readonly gamePlay: Readonly<GamePlay>;
    readonly user: Readonly<User>;

    setGame(game: Game): void;
    initNewGame(user: User): void;
    setBoard(board: Board<string>): void;
    increaseScore(score: number): void;
    decreaseMoves(): void;
    endGame(): void;
    emptyGame(): void;

    setSelectedPiece(position: Position | undefined): void;
    setMessage(message: string): void;
    setMatches(positions: Position[]): void;
    clearMatches(): void;
    setCalculatingMove(calculatingMove: boolean): void;

    login(user: User): void;
    logout(): void;
};

const generator = new BoardModel.RandomGenerator('X,Y,Z');
const initBoard = BoardModel.generateGrid(generator, 3, 3);
BoardModel.checkAndHandleMatch(initBoard, [], generator);
export const model: Model = reactive({
    games: [] as Game[],
    game: {
        user: 0,
        id: 0,
        board: initBoard,
        score: 0,
        nrOfMoves: 15,
        targetScore: 200,
        completed: false,
    } as Game,
    gamePlay: {
        selectedPiece: undefined,
        message: "",
        matches: [],
        calculatingMove: false
    } as GamePlay,
    user: {
         username: "",
         password: "",
         token: undefined,
         userId: 0,
         isAdmin: false
    } as User, 
    
    setGame(game: Game) {
        this.game = {... game}
        if(!game.nrOfMoves){
            this.game.nrOfMoves = 20;
        }
        if(!game.targetScore){
            this.game.nrOfMoves = 300;
        }
    },
    initNewGame(user: User){
        const initBoard = BoardModel.generateGrid(generator, 3, 3);
        this.game = { ...this.game, board: initBoard, score: 0, nrOfMoves: 15, completed: false, user: user.userId };
        BoardModel.checkAndHandleMatch(initBoard, [],generator);
    },
    setBoard(board: Board<string>) {
        this.game.board = { ...board };
    },
    increaseScore(score: number) {
        this.game.score += score;
    },
    decreaseMoves() {
        --this.game.nrOfMoves;
    },
    endGame() {
        this.game.completed = true;
    },
    emptyGame() {
        this.game = {
            user: 0,
            id: 0,
            board: initBoard,
            score: 0,
            nrOfMoves: 15,
            targetScore: 200,
            completed: false
        }
    },
    setSelectedPiece(position: Position | undefined) {
        this.gamePlay.selectedPiece = position ? { row: position.row, col: position.col } : undefined;
    },
    setMessage(message: string) {
        this.gamePlay.message = message;
    },
    setMatches(positions: Position[]) {
        this.gamePlay.matches.push(...positions)
    },
    clearMatches() {
        this.gamePlay.matches = []
    },
    setCalculatingMove(calculatingMove: boolean) {
        this.gamePlay.calculatingMove = calculatingMove
    },
    login(user: User) {
        this.user = { ...user }
    },
    logout() {
        this.user = {
            username: '',
            password: '',
            token: undefined,
            userId: 0,
            isAdmin: false
        }
    }
})
