import axios from 'axios';
import { store } from "../store";

const axiosInstance = axios.create({
    baseURL: 'https://milebiadmin.dig-x.co.in/api/',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

axiosInstance.interceptors.request.use((config) => {
    const user = store.getState().login.user;
    if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;
