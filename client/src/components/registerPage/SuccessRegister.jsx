import React, {Component} from "react";

const RegisterPage = () => {

    return (
        <div className="w-full px-6 h-screen flex justify-center pt-10 md:pt-0 md:items-center">
            <div className="text-center">
                <p className="text-3xl mb-4">Registration is successful. You may proceed to Login.</p>
                <a href="/login"
                        className="text-white text-xl mb-2 md:mb-0 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Log In
                </a>
            </div>
        </div>
    );
}

export default RegisterPage
