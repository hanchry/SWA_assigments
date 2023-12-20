<template>
    <div class="flex flex-col">
        <score-table :title="'Top 5 Scores'" :games="getTopScores(5)"></score-table>
        <score-table :title="'Your Top 3 Scores'" :games="getUserTopScores(3)"></score-table>
    </div>
</template>

<script>
import * as API from "../api/api";
import ScoreTable from "@/components/ScoreTable.vue"; // Adjust the path accordingly

export default {
    props: {
        model: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            games: [],
        };
    },
    components: {
        ScoreTable,
    },
    mounted() {
        API.getAllGames(this.model.user.token).then((result) => {
            this.games = result;
        });
    },
    methods: {
        getTopScores(count) {
            return this.games
                .filter((game) => game.completed)
                .sort((a, b) => b.score - a.score)
                .splice(0, count);
        },
        getUserTopScores(count) {
            return this.games
                .filter((game) => game.completed && game.user === this.model.user.userId)
                .sort((a, b) => b.score - a.score)
                .splice(0, count);
        },
    },
};
</script>

<style>
/* Add any custom styles if needed */
</style>
