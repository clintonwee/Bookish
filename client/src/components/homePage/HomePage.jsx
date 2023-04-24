import React from "react";
import Navbar from "../Layout/Navbar";
import Catalogue from "./Catalogue";

const HomePage = () => {
        return (
            <div className="min-h-screen flex flex-col items-center">
                <Navbar/>
                <div className="w-3/4 mt-10 bg-gray-100 shadow-lg px-4 py-4 rounded-lg">
                    <p className="text-2xl mb-4">Catalogue</p>
                    <Catalogue/>
                </div>
            </div>
        );
}

export default HomePage
