import React, {useState} from "react";
import {Container} from "reactstrap";
import HomePage from "./homePage/HomePage";
import {ApiService} from "./ApiService";
import {Routes, Route} from "react-router-dom"
import LoginPage from "./loginPage/LoginPage";
import LoanPage from "./loanPage/LoanPage";
import RegisterPage from "./registerPage/RegisterPage";
import SuccessRegister from "./registerPage/SuccessRegister";
import ProtectedRoutes from "./Layout/ProtectedRoutes";

export default function App() {
    const apiService = new ApiService()
    const [state, setState] = useState(BLANK_STATE);

    let healthCheck = () => {
        apiService.healthCheck().then((status) => {
            initialize(status);
        });
    };

    let initialize = (status) => {
        setState(status);
    };

    if (state === BLANK_STATE) {
        healthCheck()
    }

    return (
        <div>
            <ProtectedRoutes>
                <Routes>
                    <Route path="/home" element={<HomePage/>}/>
                    <Route path="login" element={<LoginPage/>}/>
                    <Route path="loans" element={<LoanPage/>}/>
                    <Route path="register" element={<RegisterPage/>}/>
                    <Route path="register/success" element={<SuccessRegister/>}/>
                </Routes>
            </ProtectedRoutes>
        </div>
    );
}

const BLANK_STATE = {
    status: ""
};
