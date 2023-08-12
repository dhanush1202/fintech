import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Homepage from "./Components/Homepage";
import NavBar from "./Components/NavBar";
import Dashboard from "./Components/Dashboard";
import EditProfile from "./Components/EditProfile";
import Signinpage from "./Components/Signinpage";

export default function App() {
  return (
    <div className=" bg-slate-300">
      <NavBar />
      <Routes>
        <Route element={<Homepage />} path="/" />
        <Route element={<Login />} path="/login" />
        <Route element={<Dashboard />} path="/dashboard" />
        <Route element={<EditProfile />} path="/editprofile" />
        <Route element={<Signinpage />} path="/signin" />
      </Routes>
    </div>
  );
}
