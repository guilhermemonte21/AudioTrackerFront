import axios from "axios";

const apiUrl = `https://audiotrackerapi-b5dfd8anabefa4d9.brazilsouth-01.azurewebsites.net/api/`;
 
// const apiUrl = `https://localhost:7139/api/`;
const api = axios.create({
    baseURL: apiUrl,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwt_token'); // Obter o JWT do localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Adicionar o token no cabeçalho Authorization
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export {api};