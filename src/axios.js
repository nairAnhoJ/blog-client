import axios from "axios";
import { useAuthStore } from "@/stores/authStore";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/v1'
});

axiosInstance.interceptors.request.use(config => {
    const authStore = useAuthStore();
    const token = authStore.token;
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default axiosInstance;