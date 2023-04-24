import React, {useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import useToken from "../../utils/useToken";

const LoginPage = () => {

    const {setToken, token, getProfile} = useToken()

    const navigate = useNavigate()

    useEffect(() => {
        async function checkLoggedIn(){
            const res = await getProfile()
            console.log(res)
            if(res.status !== "error"){
                navigate("/home")
            }
        }
        checkLoggedIn()
    }, [token])

    const onSubmit = async (e) => {
        e.preventDefault()
        const {email, password} = e.target.elements;
        const newUser = {
            email: email.value,
            password: password.value,
        }

        const res = await axios.post("/login", newUser)
        if (res.data.status === 'success') {
            setToken(res.data.access_token)
            console.log("GOING HOME")
            navigate("/home")
        } else {
            console.log(res)
            alert("An error has occurred")
        }
    }

    return (
        <div className="w-full px-6 h-screen flex justify-center pt-10 md:pt-0 md:items-center">
            <form className="w-full md:w-3/4 md:max-w-screen-md" onSubmit={onSubmit}>
                <div className="mb-6">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                        email</label>
                    <input type="email" id="email"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="name@register.com" required/>
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                        password</label>
                    <input type="password" id="password"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           required/>
                </div>
                <div className="flex flex-col md:flex-row items-center">
                    <button type="submit"
                            className="text-white mb-2 md:mb-0 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit
                    </button>
                    <p className="text-sm text-gray-500 ml-4">Not a user? <a href="/register"
                                                                             className="text-blue-500 underline">Sign
                        up</a></p>
                </div>
            </form>
        </div>
    );
}

export default LoginPage
