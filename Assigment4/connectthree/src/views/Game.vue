<template>
    <div>
        <div class="center" v-if="playStarted">
            <div>
                <button class='btn btn-warning' v-if="!model.gamePlay.calculatingMove" @click="backToMain()">Back to main
                    page</button>
            </div>
            <div class='play-info' v-if="!model.game.completed">
                <div class='play-target-score'>
                    TARGET SCORE: {{ model.game.targetScore }}
                </div>
                <div class='play-score'>
                    YOUR SCORE: {{ model.game.score }}
                </div>
                <div class='play-moves'>
                    MOVES LEFT: {{ model.game.nrOfMoves }}
                </div>
            </div>
            <div class='play-end' v-else>
                <div v-if="model.game.score >= model.game.targetScore">Congrats! You won with a score of {{
                    model.game.score
                }} and {{ model.game.nrOfMoves }} moves left.</div>
                <div v-else>You were {{ (model.game.targetScore - model.game.score) }} points away! Try again?</div>
            </div>
            <div class='row' v-for="(row, index) in model.game.board?.pieces" v-bind:key="'Row' + index">
                <div class='element' v-for="(symbol, colIndex) in row" v-bind:key="'Tile' + index + ',' + colIndex">
                    <BoardElement :rowIndex='index' :colIndex='colIndex' :element='symbol' />
                </div>
            </div>
            <div class='play-message'>
                {{ model.gamePlay.message }}
            </div>
        </div>
        <div class="center" v-else>
            <h2>Continue your games:</h2>
            <div class='container'>
                <div class='row'>
                    <button class='btn btn-light btn-block col-4'
                        v-for="game in model.games.filter((game) => !game.completed && game.user === model.user.userId)"
                        v-bind:key="game.id" @click="continueGame(game.id)">Game {{ game.id }}</button>
                </div>
            </div>
            <div>
                <h2 class='mt-3'>Start a new game:</h2>
                <button class='btn btn-info' @click="startAnotherGame()">New Game</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import * as API from '../api/api'
import { model } from '../store/store'
import BoardElement from '../components/BoardElement.vue'
import { defineComponent } from "vue";

export default defineComponent({
    data() {
        return {
            model,
            playStarted: false,
        }
    },
    methods: {
        backToMain() {
            this.playStarted = false;
        },
        continueGame(id: number) {
            this.playStarted = false;
            model.emptyGame();
            let hasBoard = true;
            API.getGameById(model.user.token!, id)
                .then((result) => { model.setGame(result), result.board ? hasBoard = true : hasBoard = false })
                .then(() => {
                    if (!hasBoard) {
                        model.initNewGame();
                        API.updateGame(model.user.token!, model.game.id, model.game);
                    }
                })
                .then(() => this.playStarted = true);
        },
        startAnotherGame() {
            this.playStarted = false;
            model.emptyGame();
            model.initNewGame(this.model.user);
            API.startNewGame(this.model.user.token!, this.model.game)
                .then((result) => {
                    API.updateGame(model.user.token!, result.id, {
                        ...this.model.game, id: result.id, user: model.user.userId!
                    }),
                        model.setGame({ ...model.game, id: result.id })
                })
                .then(() => this.playStarted = true);
        }
    },
    mounted() {
        const findGames = async () => {
            API.getAllGames(model.user.token!).then((result) => {
                model.games = result!
            })
            setTimeout(findGames, 5000)
        }

        findGames()
    },
    components: {
        BoardElement
    },
})
</script>


<style>
.play-message {
    position: absolute;
    bottom: 0;
    margin-bottom: 20px;
}

.element {
    width: 50px !important;
    padding: 0 !important;
    margin-top: 0 !important;
}

.row {
    margin-left: 5px !important;
    display: flex;
    justify-content: center;
}

.center {
    text-align: center;
}
</style>