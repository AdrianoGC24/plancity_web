import type { CategoryResponse } from "./category"
export interface EventResponse{
    id:string
    name:string
    description:string
    date:string
    location:string
    price:number
    capacity:number
    category:CategoryResponse
    categoryId:string
    images:string[]
    createdAt:string
    updatedAt:string
}
export interface CreateEvent{
    name:string
    description?:string
    date:string
    location:string
    price:number
    capacity:number
    categoryId:string
    images?: string[]
}
export interface UpdateEvent{
    name?:string
    description?:string
    date?:string
    location?:string
    price?:number
    capacity?:number
    categoryId?:string
    images?: string[]
}
