import React from "react";
import LoginPage from "./Components/Auth/Login";
// import { Router } from "express";
import { Route, Routes } from "react-router-dom";
import Signin from "./Components/Auth/Signin";
import Dashboard from "./Components/Pages/Dashboard";
import { Sidebar } from "./Components/Sidebar";
import Discover from "./Components/Pages/Discover";
import Profile from "./Components/Pages/Profile";
import Connection from "./Components/Pages/Connection";
import Requests from "./Components/Pages/Requests";

const App = () => {
  return (
    <div>
        <Routes>
          
          <Route path='/' element={<Dashboard />} />
          <Route path='/discover' element={<Discover />} />
          <Route path='/connections' element={<Connection />} />
          <Route path='/profile/edit' element={<Profile />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<Signin />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/requests' element={<Requests />} />

        </Routes>
    </div>
  );
};

export default App;
