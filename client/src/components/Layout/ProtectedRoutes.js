import {useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import axios from "axios";
import useToken from "../../utils/useToken"
const ProtectedRoutes = ({children}) => {
    const location = useLocation();
    const protectedRoutes = ['/loans', '/home']
    const {prepareHeaders,getProfile, token } = useToken()
    const isProtected = protectedRoutes.indexOf(location.pathname) !== -1
    const navigate = useNavigate()

    useEffect(() => {
        if(!token){
            navigate("/login")
        }
    }, [isProtected, location])
    console.log(isProtected)
    return (
        <>
            {children}
        </>
    )
}
export default ProtectedRoutes