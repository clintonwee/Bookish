import React, { useState } from "react";
import { Container } from "reactstrap";
import { HomePage } from "./homePage/HomePage";
import { ApiService } from "./ApiService";
import { Routes, Route } from "react-router-dom"
import LoginPage from "./loginPage/LoginPage";

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
      <Routes>
        <Route path="/" element={ <HomePage/> } />
        <Route path="login" element={ <LoginPage/> } />
      </Routes>
    </div>
  );
}

const BLANK_STATE = {
  status: ""
};
