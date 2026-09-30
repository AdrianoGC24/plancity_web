export interface CreateCategory{
    name:string
    description?:string
}
export interface UpdateCategory{
    name?:string
    description?:string
}
export interface CategoryResponse{
    id:string
    name:string
    description:string
    createdAt:string
    updatedAt:string

}