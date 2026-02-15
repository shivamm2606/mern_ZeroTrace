import axios from 'axios';

const axiosInstance = axios.create({
    // In production, Vite uses import.meta.env
    // In dev, it falls back to localhost
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    withCredentials: true, // For sending cookies
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
