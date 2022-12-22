import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import router from "./router";

const http: AxiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,
    headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.token}`
    }
});

http.interceptors.response.use(
    (res) => res.data,
    (err) => {
      if (err.response.status === 401) {
        if (localStorage.token) upadateToken()
        else router.push("/login")
        return Promise.reject(err.response.data);
      }
  
      if (err.request) {
        console.error("err request", err.request)
        return Promise.reject(err.request);
      }
  
      console.error("err", err.message)
      return Promise.reject(err.message);
    }
  );

export default http;

function upadateToken() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;
    router.push("/")
}