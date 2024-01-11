import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { getToken } from "./helpers";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Welcome from "./pages/Welcome";
import Dashboard from "./pages/Dashboard";
import UploadData from "./pages/UploadData";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/upload" 
      element={getToken() ? <UploadData /> : <Navigate to="/signin" />}
      />
      <Route
        path="/dashboard"
        element={getToken() ? <Dashboard /> : <Navigate to="/signin" />}
      />
    </Routes>
  );
};

export default AppRoutes;
