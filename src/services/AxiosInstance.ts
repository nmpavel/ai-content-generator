import axios from "axios";
import Cookies from "js-cookie";

const authApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, 
  timeout: 15000,
});
export const publicApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 15000,
});
// Add Authorization header
authApi.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default authApi;