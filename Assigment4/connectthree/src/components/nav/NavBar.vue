<template>
    <header>
        <div class="wrapper bg-gray-800">
          <nav class="flex w-full">
            <router-link to="/">Home</router-link>
            <router-link to="/game">Play</router-link>
            <router-link to="/scoreboard">Scoreboard</router-link>
            <router-link to="/profile">Profile</router-link>
            <PrimaryButton size="sm" color="red" textColor="white" @click="logout()">
                <template #icon>
                    <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 15">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M1 7.5h11m0 0L8 3.786M12 7.5l-4 3.714M12 1h3c.53 0 1.04.196 1.414.544.375.348.586.82.586 1.313v9.286c0 .492-.21.965-.586 1.313A2.081 2.081 0 0 1 15 14h-3"/>
                    </svg>
                </template>   
                <div class="">
                    <span>Log Out</span>
                </div>
            </PrimaryButton>
          </nav>
        </div>
    </header>
</template>

<script>
import PrimaryButton from '@/components/buttons/PrimaryButton.vue';
import { useGameStore } from '../../store/store'
import * as API from '../../api/api'

export default {
    components: {
        PrimaryButton
    },
    methods: {
        logout() {
            const model = useGameStore();
            API.logoutUser(model.user.token).then(() => {
                const model = useGameStore();
                model.logout();
                this.$router.push({ name: 'login' });
            });   
        }
    }

}
</script>

<style scoped>

nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 60px;
    /* Adjust the height as needed */
}

nav a {
    text-decoration: none;
    color: #fff;
    /* Adjust the text color */
    padding: 10px;
    border-bottom: 2px solid transparent;
    /* Add an underline effect */
}

nav a:hover {
    border-bottom-color: #007BFF;
    /* Change the color on hover */
}</style>