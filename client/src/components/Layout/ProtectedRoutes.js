import {useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import useToken from "../../utils/useToken"

const ProtectedRoutes = ({children}) => {
    const location = useLocation();
    const protectedRoutes = ['/loans', '/home']
    const {token} = useToken()
    const isProtected = protectedRoutes.indexOf(location.pathname) !== -1
    const navigate = useNavigate()

    useEffect(() => {
        if (!token && isProtected) {
            navigate("/login")
        }
    }, [isProtected, location])

    if ((isProtected && token) || !isProtected) {
        return (
            <>
                {children}
            </>
        )
    }
}
export default ProtectedRoutes