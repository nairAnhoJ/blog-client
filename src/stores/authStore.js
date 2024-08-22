import { defineStore } from "pinia";
import { ref } from "vue";
import axios from '@/axios';
import router from "@/Router";

export const useAuthStore = defineStore('auth', () => {
    const token = ref(localStorage.getItem('token') || null);

    const isAuthenticated = () => {
        return !!token.value;
    };

    const setToken = (newToken) => {
        token.value = newToken;
        localStorage.setItem('token', newToken);
    };
 
    const logout = async () => {
        const response = await axios.post('http://localhost:8000/api/auth/logout');
        token.value = null;
        localStorage.removeItem('token');
        router.push({ name: 'home' });
    };

    return {
        token,
        isAuthenticated,
        setToken,
        logout
    };
});
