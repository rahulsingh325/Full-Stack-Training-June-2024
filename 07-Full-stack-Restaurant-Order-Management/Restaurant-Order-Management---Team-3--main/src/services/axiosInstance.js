import axios from "axios";


export const axiosInstance = axios.create({
    baseURL:'https://rms-backend-1ilc.onrender.com',
    withCredentials:true
})


