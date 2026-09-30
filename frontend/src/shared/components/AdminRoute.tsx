import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../../features/auth/hooks/useAuth"
export default function AdminRoute(){
    const { role, loading } = useAuth()
    if(loading){

        return <p>Cargando...</p>

    }
    if(role !== "admin"){

        return <Navigate to="/login" replace />
    }
    return <Outlet/>
}