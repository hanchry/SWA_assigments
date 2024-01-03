<template>
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <FormFields :ButtonText="'Edit'" :message="message" @close="message=''" @submit="submit"></FormFields>
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
            model: useGameStore(),
            message: ''
        }
    },
    methods: {
        submit(username, password) {
            API.changePassword(this.model.user.token, password, this.model.user.userId).then((result) => {
                if (result !== 'Invalid username or password') {
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
