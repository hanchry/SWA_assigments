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
import { model } from '../store/store';
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
            model,
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

    methods: {
        async selectedElement() {
            if (this.isMoveAllowed()) {
                this.setSelectedState(true);
                const currentPosition = { row: this.rowIndex, col: this.colIndex };
                if (model.gamePlay.selectedPiece) {
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
            return !model.gamePlay.calculatingMove && !model.game.completed;
        },
        setSelectedState(state) {
            this.selected = state;
        },
        selectCurrentPiece(position) {
            model.setSelectedPiece(position);
        },
        async performMove(targetPosition) {
            model.setCalculatingMove(true);
            const moveResults = model.gamePlay.selectedPiece ? BoardModel.move(model.gamePlay.selectedPiece, targetPosition, model.game.board,this.generator) : null;
            await this.handleMoveResults(moveResults);
            this.finishMove();
        },
        async handleMoveResults(moveResults) {
            if (moveResults.effects.length > 0) {
                this.updateBoardAfterMove(moveResults);
                await this.processMoveEffects(moveResults.effects);
            } else {
                model.setSelectedPiece(undefined);
                this.setSelectedState(false);
                this.displayInvalidMoveMessage();
            }
        },
        updateBoardAfterMove() {
            model.decreaseMoves();
            const newBoard = this.createUpdatedBoard();
            model.setBoard(newBoard);
            model.setSelectedPiece(undefined);
        },
        createUpdatedBoard() {
            const newBoard = JSON.parse(JSON.stringify(model.game.board));
            const selectedPiece = model.gamePlay.selectedPiece;
            newBoard.pieces[selectedPiece.row][selectedPiece.col] = BoardModel.piece(model.game.board, selectedPiece);
            newBoard.pieces[this.rowIndex][this.colIndex] = BoardModel.piece(model.game.board, selectedPiece);
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
            model.increaseScore((matchPositions.length - 2) * 5);
            model.setMatches(matchPositions);
        },
        async handleRefillEffect(effect) {
            model.setMessage("Refilling...");
            await this.timeout(1000);
            model.setBoard(effect.board);
            model.setMessage('');
            model.clearMatches();

            if (model.gamePlay.selectedPiece) {
                model.setSelectedPiece(undefined);
                this.setSelectedState(false);
            }
        },

        displayInvalidMoveMessage() {
            model.setMessage("MOVE NOT ALLOWED");
            setTimeout(() => model.setMessage(''), 1000);
        },
        finishMove() {
            model.setSelectedPiece(undefined);
            this.$nextTick(() => {
                this.setSelectedState(false);
            });
            model.setCalculatingMove(false);
            this.checkGameCompletion();
        },
        checkGameCompletion() {
            if (model.game.score >= model.game.targetScore || (model.game.nrOfMoves === 0 && model.game.score < model.game.targetScore)) {
                this.endGame();
            } else {
                this.updateGameStatus();
            }
        },
        endGame() {
            model.endGame();
            api.updateGame(model.user.token!, model.game.id, { ...model.game, completed: true });
        },
        updateGameStatus() {
            api.updateGame(model.user.token!, model.game.id, model.game);
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