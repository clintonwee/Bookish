import React from "react";
import Navbar from "../Layout/Navbar";
import Loans from "./Loans"

const LoanPage = () => {
        return (
            <div className="min-h-screen flex flex-col items-center">
                <Navbar/>
                <div className="w-3/4 mt-10 bg-gray-100 shadow-lg px-4 py-4 rounded-lg">
                    <p className="text-2xl mb-4">My Loans</p>
                    <Loans/>
                </div>
            </div>
        );
}

export default LoanPage

