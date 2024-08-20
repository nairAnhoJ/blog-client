<script setup>
    import { RouterLink, RouterView } from 'vue-router';
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
            <RouterLink to="/login">LOGIN</RouterLink>
            <!-- <RouterLink to="/logout">LOGOUT</RouterLink> -->
        </div>
    </nav>
</template>