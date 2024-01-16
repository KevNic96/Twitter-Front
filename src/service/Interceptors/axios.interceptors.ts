import axios from "axios";
import type { InternalAxiosRequestConfig, AxiosRequestHeaders } from "axios";

// Punto 4)
export const AxiosInterceptor = () =>{
    const updateHeaders = (request: InternalAxiosRequestConfig) =>{
        const token = localStorage.getItem("token");

        request.headers = {Authorization: token} as AxiosRequestHeaders

        return request;
    }

    axios.interceptors.request.use((request) =>{
        return updateHeaders(request);
    })

    axios.interceptors.response.use(
        (response) =>{
            return response;
        },
        (error) => {
            if(error.response?.status === 401){
                localStorage.removeItem("token");
                window.location.href = "/sign-in";
            }
            return Promise.reject(error)
        }
    )
}