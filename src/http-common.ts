import axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
    baseURL: `${process.env.apiUrl}/v2/view/`,
    headers: {
        "Content-type": "application/json"
    }
});

export default apiClient;