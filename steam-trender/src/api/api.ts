import axios from "axios";

const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://api:8000",
    headers: {
        "Content-Type": "application/json",
    },
});

export default API;
