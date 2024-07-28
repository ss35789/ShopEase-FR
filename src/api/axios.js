import axios from 'axios';
import { getCookie } from '../utils/cookies';

const instance = axios.create({
    baseURL: process.env.REACT_APP_BE_URL,
});

instance.interceptors.request.use(
    config => {
        const token = getCookie('accessToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default instance;
