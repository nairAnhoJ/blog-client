import { defineStore } from "pinia";
import { ref } from "vue";
import axios from '@/axios';
import router from "@/Router";

export const useAuthStore = defineStore('auth', () => {
    const token = ref(localStorage.getItem('token') || null);
    console.log(token);
    

    const isAuthenticated = () => {
        return !!token.value;
    };

    const setToken = (newToken) => {
        token.value = newToken;
        localStorage.setItem('token', newToken);
    };
 
    const logout = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/auth/logout');
            token.value = null;
            localStorage.removeItem('token');
            router.push({ name: 'home' });
        } catch (error) {
            token.value = null;
            localStorage.removeItem('token');
            router.push({ name: 'login' });
        }
    };

    return {
        token,
        isAuthenticated,
        setToken,
        logout
    };
});
