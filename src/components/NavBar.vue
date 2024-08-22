<script setup>
    import { RouterLink, RouterView } from 'vue-router';
    import { useAuthStore } from '@/stores/authStore';

    const authStore = useAuthStore();
</script>

<template>
    <nav class="text-white py-4 px-10 bg-neutral-700 flex items-center justify-between h-16 w-full">
        <div>
            <RouterLink to="/">BLOG</RouterLink>
        </div>
        <div>
            <RouterLink to="/" class="w-20 text-right hover:underline">HOME</RouterLink>
            <span class="px-2">|</span>
            <RouterLink to="/users" class="w-20 text-right hover:underline">USERS</RouterLink>
        </div>
        <div>
            <RouterLink v-if="!authStore.isAuthenticated()" to="/login" class="w-20 text-right hover:underline">LOGIN</RouterLink>
            <a v-if="authStore.isAuthenticated()" @click.prevent="authStore.logout" class="cursor-pointer w-20 text-right">LOGOUT</a>
        </div>
    </nav>
</template>