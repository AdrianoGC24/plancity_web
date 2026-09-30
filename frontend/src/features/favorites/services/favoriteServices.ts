import API from "../../../lib/api"
export const getFavorites=async()=>{
    const response=await API.get("/favorites")
    return response.data
}


export const addFavorite=async(eventId:string)=>{
    const response=await API.post(`/favorites/${eventId}` )
    return response.data
}

export const removeFavorite=async(eventId:string)=>{
    await API.delete(`/favorites/${eventId}`)

}