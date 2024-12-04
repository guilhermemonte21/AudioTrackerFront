import axios from "axios";

const apiUrl = `https://audiotrackerapi-b5dfd8anabefa4d9.brazilsouth-01.azurewebsites.net/api/`;

export const api = axios.create({
    baseURL: apiUrl,
});