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
        const axiosToken = axios.defaults.headers.common['Authorization'];
        console.log("axiosToken", axiosToken)
        console.log("localStorage.token", localStorage.token)

        if ((!axiosToken || err.response.data.error === "UnauthorizedError") && localStorage.token) {
          console.log("interceptor IF")
          upadateToken()
        } else if (!localStorage.token) {
          console.log("interceptor ELSE IF")
          router.push("/login");
        } else console.log("interceptor ELSE", err.response.data)
        return Promise.reject(err.response.data);
      }
  
      if (err.request) {
        console.error("err request", err.request)
        return Promise.reject(err.request);
      }
  
      console.error("err", err.message);
      return Promise.reject(err.message);
    }
  );

export default http;

function upadateToken() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;
    router.push("/")
}