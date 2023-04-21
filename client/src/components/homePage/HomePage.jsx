import React, {Component} from "react";
import Navbar from "./Navbar";


export class HomePage extends Component {
    render() {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar/>
                <div className="h-screen w-full flex justify-center items-center">
                    <p>Catalogue</p>
                </div>
            </div>
        );
    }
}
