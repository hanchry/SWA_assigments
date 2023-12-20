<template>
    <div class="flex flec-col justify-center">
            <div class="relative overflow-x-auto w-full">
                <table class="w-full text-sm text-left rtl:text-center text-gray-500 dark:text-gray-400 text-center">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3 w-44">
                                {{ title }}
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Player ID
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Points
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-white dark:bg-gray-800 hover:bg-gray-900"  v-for="game in games" :key="game.id">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {{ getGameDescription(game) }}
                            </th>
                            <td class="px-6 py-4">
                                {{ game.user }}
                            </td>
                            <td class="px-6 py-4">
                                {{ game.score }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true,
        },
        games: {
            type: Array,
            required: true,
        },
    },
    methods: {
        getGameDescription(game) {
            // Customize the game description based on your needs
            return `Game ${game.id}`;
        },
    },
};
</script>

<style>
/* Add any custom styles if needed */
</style>
