import React, {Component} from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
const RegisterPage = () => {
    const navigate = useNavigate();
    const onSubmit = async (e) => {
        e.preventDefault()
        const {firstName, lastName, email, password} = e.target.elements;
        const newUser = {
            first_name: firstName.value,
            last_name: lastName.value,
            email: email.value,
            age: 20,
            password: password.value,
            isAdmin: false
        }
        const res = await axios.post("/user", newUser)
        if(res.data.status === 'success'){
            navigate("/register/success")
        } else {
            console.log(res)
            alert("An error has occurred")
        }
    }
    return (
        <div className="w-full px-6 h-screen flex justify-center pt-10 md:pt-0 md:items-center">
            <form className="w-full md:w-3/4 md:max-w-screen-md" onSubmit={onSubmit}>
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="col-span-2 md:col-span-1">
                        <label htmlFor="firstName"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            First Name</label>
                        <input type="firstName" id="firstName"
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="John" required/>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <label htmlFor="lastName"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Last Name</label>
                        <input type="lastName" id="lastName"
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="Wee" required/>
                    </div>
                </div>
                <div className="mb-6">
                    <label htmlFor="email"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input type="email" id="email"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="name@gmail.com" required/>
                </div>
                <div className="mb-6">
                    <label htmlFor="password"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input type="password" id="password"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           required/>
                </div>
                <div className="flex flex-col md:flex-row items-center">
                    <button type="submit"
                            className="text-white mb-2 md:mb-0 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register
                        new account
                    </button>
                    <p className="text-sm text-gray-500 ml-4">Already a user? <a href="/login"
                                                                                 className="text-blue-500 underline">Log
                        In</a></p>
                </div>
            </form>
        </div>
    );
}

export default RegisterPage
