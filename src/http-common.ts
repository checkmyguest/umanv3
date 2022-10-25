import axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,
    headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
});

export default apiClient;