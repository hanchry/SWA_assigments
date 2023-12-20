<template>
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div class="space-y-6">
            <div>
                <label for="username" class="block text-sm font-medium leading-6 text-white">Username</label>
                <div class="mt-2">
                <input id="username" v-model="username"  name="username" type="username" autocomplete="username" required class="block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6">
                </div>
            </div>
            <div>
                <div class="flex items-center justify-between">
                <label for="password" class="block text-sm font-medium leading-6 text-white">Password</label>
                </div>
                <div class="mt-2">
                <input id="password" v-model="password" name="password" type="password" autocomplete="current-password" required class="block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6">
                </div>
            </div>
            <div class="w-full flex justify-center">
                <primary-button @click="logIn" size="md">Sign in</primary-button>
            </div>
            <div v-if="message">
                <error @close="message = null" :strongText="message"></error>
            </div>
        </div>
        <p class="mt-5 text-center text-sm text-white">
          Not a member?
          <a href="#" class="font-semibold leading-6 text-blue-600 hover:text-blue-500">Register</a>
        </p>
      </div>
    </div>

</template>

<script>
import * as API from '../api/api'
import Error from '../components/alerts/Error.vue'
import PrimaryButton from '../components/buttons/PrimaryButton.vue'

import { model } from '../store/store'
export default {
  components: { PrimaryButton, Error },
    data() {
        return {
            model,
            username: '',
            password: '',
            message: ''
        }
    },
    methods: {
        logIn() {
            API.loginUser(this.username, this.password).then((result) => {
                if (result !== 'Invalid username or password') {
                    model.login(result);
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
