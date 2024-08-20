<template>
    <div class="flex w-full h-full items-center justify-center">
        <form class="w-96 mb-32" @submit.prevent="login">
            <h1 class="text-center mb-5 text-white font-bold text-3xl">Welcome Back!</h1>
            <div class="">
                <label for="email" class="block mb-2 text-sm font-medium text-white">Email</label>
                <input type="text" id="email" v-model="email" class="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"/>
            </div>
            <p v-if="errors && errors.email" class="text-red-500">{{ errors.email[0] }}</p>
            <div class="mt-5">
                <label for="password" class="block mb-2 text-sm font-medium text-white">Password</label>
                <input type="password" id="password" v-model="password" class="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"/>
            </div>
            <p v-if="errors && errors.password && errors" class="text-red-500">{{ errors.password[0] }}</p>
            <button type="submit" class="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 mt-5">Login</button>
        </form>
    </div>
</template>

<script>
    import axios from 'axios';
    import { useAuthStore } from '@/stores/authStore';

    export default {
        setup(){
            const authStore = useAuthStore();

            return {
                authStore,
            };
        },
        data() {
            return {
                email: '',
                password: '',
                errors: null,
            };
        },
        methods: {
            async login() {
                try {
                    const response = await axios.post('http://localhost:8000/api/auth/login', {
                        email: this.email,
                        password: this.password,
                    });

                    this.authStore.setToken(response.data.token);
                    this.$router.push({ name: 'home' });
                } catch (error) {
                    if (error.response) {
                        if (error.response.status === 422) {
                        this.errors = error.response.data.errors || {};
                        } else {
                        this.error = 'Invalid login credentials.';
                        }
                    } else {
                        this.error = 'An unexpected error occurred. Please try again later.';
                    }
                }
            }
        }
    }

</script>
