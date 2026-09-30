export type Role = "user" | "admin"
export interface UserResponse{
    id:string
    name:string
    email:string
    role:Role
    createdAt:string
}