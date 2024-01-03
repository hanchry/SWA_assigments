<template>
    <div>
        <div class="center" v-if="playStarted">
            <div>
                <button class='text-gray-300 mb-2 font-bold border-b' v-if="!model.gamePlay.calculatingMove" @click="backToMain()">Back to main
                    page</button>
            </div>
            <div class='play-info' v-if="!model.game.completed">
                <div class='text-white font-bold'>
                    TARGET SCORE: {{ model.game.targetScore }}
                </div>
                <div class='text-white font-bold'>
                    YOUR SCORE: {{ model.game.score }}
                </div>
                <div class='text-white font-bold'>
                    MOVES LEFT: {{ model.game.nrOfMoves }}
                </div>
            </div>
            <div class='text-white' v-else>
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
            <div v-if="model.gamePlay.message" class='w-full flex justify-center'>
                <error :strongText='model.gamePlay.message' />
            </div>
        </div>
        <div class="center text-white w-full flex justify-center" v-else>
            <div class="w-1/3 flex justify-center flex-col">
                <h2 class="text-4xl font-bold">Continue your games:</h2>
                <div class='mb-5 mt-5 grid grid-cols-5 grid-rows-auto gap-5'>
                    <primary-button class='w-full justify-center' :size="'sm'"
                        v-for="game in model.games.filter((game) => !game.completed && game.user === model.user.userId)"
                        v-bind:key="game.id" @click="continueGame(game.id)">Game {{ game.id }}</primary-button>
                </div>
                <div>
                    <primary-button class='btn btn-info' @click="startAnotherGame()">New Game</primary-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import * as API from '../api/api'
import { useGameStore } from '../store/store'
import BoardElement from '../components/BoardElement.vue'
import PrimaryButton from '../components/buttons/PrimaryButton.vue';
import { defineComponent } from "vue";
import Error from '../components/alerts/Error.vue';

export default defineComponent({
    data() {
        return {
            model: useGameStore(),
            playStarted: false,
        }
    },
    methods: {
        backToMain() {
            this.playStarted = false;
        },
        continueGame(id: number) {
            this.playStarted = false;
            this.model.emptyGame();
            let hasBoard = true;
            API.getGameById(this.model.user.token!, id)
                .then((result) => { this.model.setGame(result), result.board ? hasBoard = true : hasBoard = false })
                .then(() => {
                    if (!hasBoard) {
                        this.model.initNewGame();
                        API.updateGame(this.model.user.token!, this.model.game.id, this.model.game);
                    }
                })
                .then(() => this.playStarted = true);
        },
        startAnotherGame() {
            this.playStarted = false;
            this.model.emptyGame();
            this.model.initNewGame(this.model.user);
            API.startNewGame(this.model.user.token!, this.model.game)
                .then((result) => {
                    API.updateGame(this.model.user.token!, result.id, {
                        ...this.model.game, id: result.id, user: this.model.user.userId!
                    }),
                        this.model.setGame({ ...this.model.game, id: result.id })
                })
                .then(() => this.playStarted = true);
        }
    },
    mounted() {
        const findGames = async () => {
            API.getAllGames(this.model.user.token!).then((result) => {
                this.model.games = result!
            })
            setTimeout(findGames, 5000)
        }

        findGames()
    },
    components: {
        BoardElement,
        Error,
        PrimaryButton
    },
})
</script>


<style>

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