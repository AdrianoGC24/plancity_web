const TOKEN_KEY = "plancity_token"

export const storage = {

    getToken(){
        return localStorage.getItem(TOKEN_KEY)
    },

    setToken(token:string){
        localStorage.setItem(TOKEN_KEY, token)
    },

    removeToken(){
        localStorage.removeItem(TOKEN_KEY)
    }

}