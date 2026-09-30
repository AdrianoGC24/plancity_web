import type { UserResponse } from "./user"
export interface Register {
name:string
email:string
password:string
}
 export interface Auth{
    accessToken:string
    user:UserResponse
 }
 export interface Login {
    email:string
    password:string
 }
export interface ChangePassword{
    currentPassword:string
    newPassword:string
}

