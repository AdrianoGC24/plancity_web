import API from "../../../lib/api"

import type { CreateCategory, UpdateCategory } from "../../../types/category"

import type { CategoryResponse } from "../../../types/category"


export const getCategories=async():Promise<CategoryResponse[]>=>{

    const response=await API.get<CategoryResponse[]>( "/categories")

    return response.data

}


export const getCategoryById=async(id:string):Promise<CategoryResponse>=>{
const response=await API.get<CategoryResponse>( `/categories/${id}`)
    return response.data

}


export const createCategory=async(
    data:CreateCategory
):Promise<CategoryResponse>=>{
    const response=await API.post<CategoryResponse>( "/categories",  data )
    return response.data
}


export const updateCategory=async( id:string, data:UpdateCategory):Promise<CategoryResponse>=>{

    const response=await API.patch<CategoryResponse>(`/categories/${id}`, data )

    return response.data

}


export const deleteCategory=async(id:string):Promise<void>=>{
    await API.delete(`/categories/${id}`  )
}