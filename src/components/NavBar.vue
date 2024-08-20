<script setup>
    import { RouterLink, RouterView } from 'vue-router';
    import { useAuthStore } from '@/stores/authStore';

    const authStore = useAuthStore();
</script>

<template>
    <nav class="text-white py-4 px-10 bg-neutral-700 flex items-center justify-between h-16 w-full">
        <div>
            BLOG
        </div>
        <div>
            <RouterLink to="/">HOME</RouterLink>
            <span class="px-2">|</span>
            <RouterLink to="/">USERS</RouterLink>
        </div>
        <div>
            <RouterLink v-if="!authStore.isAuthenticated()" to="/login">LOGIN</RouterLink>
            <a v-if="authStore.isAuthenticated()" @click.prevent="authStore.logout">LOGOUT</a>
        </div>
    </nav>
</template>