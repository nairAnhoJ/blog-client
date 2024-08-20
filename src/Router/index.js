import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

import LoginPage from "@/views/LoginPage.vue";
import HomePage from "@/views/HomePage.vue";

const router = createRouter({
    history: createWebHistory('/'),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage,
        },
        {
            path: '/login',
            name: 'login',
            component: LoginPage,
            meta: { requiresGuest: true },
        },
        {
            path: '/users',
            name: 'users',
            component: HomePage,
            meta: { requiresAuth: true },
        },
    ]
});

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
  
    if (to.matched.some(record => record.meta.requiresAuth) && !authStore.isAuthenticated()) {
      next('/login');  // Redirect to login if not authenticated
    } else if (to.matched.some(record => record.meta.requiresGuest) && authStore.isAuthenticated()) {
        next('/');  // Redirect to home if already authenticated and trying to access login
    } else {
        next();  // Proceed to the route
    }
  });

export default router