import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost/marketplace/api/',
});

export default api;
