import axios from "axios"
import { storage } from "./storage"

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers:{
    "Content-Type":"application/json"
  }
})
API.interceptors.request.use(

    (config)=>{
        const token = storage.getToken()
        if(token){
           config.headers.Authorization = `Bearer ${token}`
       }
        return config
    },
    (error)=>{
      return Promise.reject(error)
    }
)

API.interceptors.response.use(
    (response)=>{
        return response
    },

    (error)=>{
        if(error.response?.status === 401){
            storage.removeToken()
            window.location.href="/login"
        }
        return Promise.reject(error)
    }
)

export default API