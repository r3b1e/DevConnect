import React from "react";
import LoginPage from "./Components/Auth/Login";
// import { Router } from "express";
import { Route, Routes } from "react-router-dom";
import Signin from "./Components/Auth/Signin";

const App = () => {
  return (
    <div>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<Signin />} />
        </Routes>
    </div>
  );
};

export default App;
