import API from "../../../lib/api"

import type {Auth,Login,Register} from "../../../types/interfaces"
import type { UserResponse } from "../../../types/user"

export const login = async(data:Login):Promise<Auth>=>{

    const response = await API.post<Auth>( "/auth/login", data )
    return response.data
}

export const register = async( data:Register):Promise<Auth>=>{
    const response = await API.post<Auth>("/auth/register",data)
    return response.data
}

export const logout = async()=>{
    await API.post("/auth/logout")

}

export const getMe = async():Promise<UserResponse>=>{
    const response = await API.get<UserResponse>("/users/me")
    return response.data
}