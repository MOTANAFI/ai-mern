import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../AuthContext/AuthContext"

const AuthRoute = ({children}) => {
    const location = useLocation()
    const {isAuthenticated, isLoading, isError} = useAuth()
    if(isLoading) {
        return <h1>Checking auth status</h1>
    }
    if(isError || !isAuthenticated) {
        return <Navigate to='/login' state={{from:location}} replace />
    } 
    return children
}
export default AuthRoute