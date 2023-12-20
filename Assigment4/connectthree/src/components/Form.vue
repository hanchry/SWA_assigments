<template>
  <div class="space-y-6">
        <div>
            <label for="username" class="block text-sm font-medium leading-6 text-white">Username</label>
            <div class="mt-2">
                <input id="username" v-model="username" name="username" type="username" autocomplete="username"
                    required
                    class="block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6">
            </div>
        </div>
        <div>
            <div class="flex items-center justify-between">
                <label for="password" class="block text-sm font-medium leading-6 text-white">Password</label>
            </div>
            <div class="mt-2">
                <input id="password" v-model="password" name="password" type="password"
                    autocomplete="current-password" required
                    class="block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6">
            </div>
        </div>
        <div class="w-full flex justify-center">
            <primary-button @click="submit" size="md">{{ ButtonText }}</primary-button>
        </div>
        <div v-if="message">
            <error @close="closeMessage()" :strongText="message"></error>
        </div>
    </div>
</template>

<script>
import PrimaryButton from './buttons/PrimaryButton.vue';
import Error from './alerts/Error.vue';
export default {
    components: { PrimaryButton, Error },
    methods: {
        submit() {
            this.$emit('submit', this.username, this.password);
        },
        closeMessage() {
            this.$emit('close');
        }
    },
    data() {
        return {
            username: '',
            password: '',
        }
    },
    props: {
        message: {
            type: String,
            default: '',
        },
        ButtonText: {
            type: String,
            default: 'Submit',
        }
    },
    emits: ['submit', 'close']

}
</script>

<style>

</style>