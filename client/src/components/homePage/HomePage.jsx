import React from "react";
import Navbar from "../Layout/Navbar";
import Catalogue from "./Catalogue";

const HomePage = () => {
        return (
            <div className="min-h-screen flex flex-col items-center">
                <Navbar/>
                <div className="w-1/2 mt-10 bg-gray-100 shadow-lg px-4 md:px-10 py-4 md:py-10 rounded-lg">
                    <p className="text-2xl mb-4">Catalogue</p>
                    <Catalogue/>
                </div>
            </div>
        );
}

export default HomePage
