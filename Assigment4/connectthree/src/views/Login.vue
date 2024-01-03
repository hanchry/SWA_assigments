<template>
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <FormFields :ButtonText="'Log In'" :message="message" @close="message=''" @submit="submit"></FormFields>

        <p class="mt-5 text-center text-sm text-white">
          Not a member?
          <router-link to="/register" class="font-semibold leading-6 text-blue-600 hover:text-blue-500">Register</router-link>
        </p>
      </div>
    </div>

</template>

<script>
import * as API from '../api/api'
import Error from '../components/alerts/Error.vue'
import PrimaryButton from '../components/buttons/PrimaryButton.vue'
import FormFields from '../components/Form.vue'

import { useGameStore } from '../store/store'
export default {
  components: { PrimaryButton, Error , FormFields },
    data() {
        return {
            message: ''
        }
    },
    methods: {
        submit(username,password) {
            API.loginUser(username, password).then((result) => {
                if (result !== 'Invalid username or password') {
                    const gameStore = useGameStore();
                    gameStore.login(result);
                    this.message = '';
                    this.$router.push({ name: 'home' });
                } else {
                    this.message = result;
                }
            });
        }
    },

}
</script>
