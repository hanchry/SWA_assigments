<template>
    <button class="row-element"
        :class="{ 'row-element--selected': (selected || (model.gamePlay.matches.some((pos) => pos.row === rowIndex && pos.col === colIndex))) }"
        @click="selectedElement()">
        {{ elementDisplay }}
    </button>
</template>

<script lang="ts">
import * as BoardModel from '../model/board';
import * as api from '../api/api';
import { useGameStore } from '../store/store';
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        rowIndex: {
            type: Number,
            required: true
        },
        colIndex: {
            type: Number,
            required: true
        },
        element: {
            required: true
        }
    },
    data() {
        return {
            model: useGameStore(),
            selected: false,
            generator: new BoardModel.RandomGenerator('X,Y,Z'),
        }
    },
    computed: {
        elementDisplay() {
            // Handle null elements, e.g., by displaying an empty string or placeholder
            return this.element === null ? '' : this.element;
        },
        isSelected() {
            return this.selected;
        }
    },
    watch: {
        'model.gamePlay.selectedPiece'(newVal) {
            if (!newVal) {
                this.setSelectedState(false);
                this.checkGameCompletion();
            }
        },
    },
    mounted() {
        this.handleMatches(this.model.game.board);  
    },

    methods: {
        async handleMatches(board) {
            const moveResults = BoardModel.checkAndHandleMatch(board, [], this.generator);
            if (moveResults !== undefined) {
                await this.handleMoveResults(moveResults);
            }
        },
        async selectedElement() {
            if (this.isMoveAllowed()) {
                this.setSelectedState(true);
                const currentPosition = { row: this.rowIndex, col: this.colIndex };
                if (this.model.gamePlay.selectedPiece) {
                    await this.performMove(currentPosition);
                } else {
                    this.selectCurrentPiece(currentPosition);
                }
            } else {
                this.setSelectedState(true);
                this.displayInvalidMoveMessage();
            }
        },
        isMoveAllowed() {
            return !this.model.gamePlay.calculatingMove && !this.model.game.completed;
        },
        setSelectedState(state) {
            this.selected = state;
        },
        selectCurrentPiece(position) {
            this.model.setSelectedPiece(position);
        },
        async performMove(targetPosition) {
            this.model.setCalculatingMove(true);
            const moveResults = this.model.gamePlay.selectedPiece ? BoardModel.move(this.model.gamePlay.selectedPiece, targetPosition, this.model.game.board,this.generator) : null;
            await this.handleMoveResults(moveResults);
            this.finishMove();
        },
        async handleMoveResults(moveResults) {
            if (moveResults.effects.length > 0) {
                this.updateBoardAfterMove(moveResults);
                await this.processMoveEffects(moveResults.effects);
            } else {
                this.model.setSelectedPiece(undefined);
                this.setSelectedState(false);
                this.displayInvalidMoveMessage();
            }
        },
        updateBoardAfterMove() {
            this.model.decreaseMoves();
            const newBoard = this.createUpdatedBoard();
            this.model.setBoard(newBoard);
            this.model.setSelectedPiece(undefined);
        },
        createUpdatedBoard() {
            const newBoard = JSON.parse(JSON.stringify(this.model.game.board));
            const selectedPiece = this.model.gamePlay.selectedPiece;
            if (!selectedPiece) {
                return newBoard;
            }
            newBoard.pieces[selectedPiece.row][selectedPiece.col] = BoardModel.piece(this.model.game.board, selectedPiece);
            newBoard.pieces[this.rowIndex][this.colIndex] = BoardModel.piece(this.model.game.board, selectedPiece);
            return newBoard;
        },
        async processMoveEffects(effects) {
            for (let effect of effects) {
                if (effect.kind === 'Match') {
                    this.handleMatchEffect(effect);
                } else {
                    await this.handleRefillEffect(effect);
                }
            }
        },
        handleMatchEffect(effect) {
            const matchPositions = effect.match?.positions ?? [];
            this.model.increaseScore((matchPositions.length - 2) * 5);
            this.model.setMatches(matchPositions);
        },
        async handleRefillEffect(effect) {
            this.model.setMessage("Refilling...");
            await this.timeout(1000);
            this.model.setBoard(effect.board);
            this.model.setMessage('');
            this.model.clearMatches();

            if (this.model.gamePlay.selectedPiece) {
                this.model.setSelectedPiece(undefined);
                this.setSelectedState(false);
            }
        },

        displayInvalidMoveMessage() {
            this.model.setMessage("MOVE NOT ALLOWED");
            setTimeout(() => this.model.setMessage(''), 1000);
        },
        finishMove() {
            this.model.setSelectedPiece(undefined);
            this.$nextTick(() => {
                this.setSelectedState(false);
            });
            this.model.setCalculatingMove(false);
            this.handleMatches(this.model.game.board);
            this.checkGameCompletion();
        },
        checkGameCompletion() {
            if (this.model.game.score >= this.model.game.targetScore || (this.model.game.nrOfMoves === 0 && this.model.game.score < this.model.game.targetScore)) {
                this.endGame();
            } else {
                this.updateGameStatus();
            }
        },
        endGame() {
            this.model.endGame();
            api.updateGame(this.model.user.token!, this.model.game.id, { ...this.model.game, completed: true });
        },
        updateGameStatus() {
            api.updateGame(this.model.user.token!, this.model.game.id, this.model.game);
        },
        timeout(delay) {
            return new Promise(res => setTimeout(res, delay));
        }
    }
})
</script>

<style>
.row-element {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;

    background-color: aliceblue;
    padding: 10px;
    margin: 5px;
}

.row-element--selected {
    background-color: aqua;
}
</style>