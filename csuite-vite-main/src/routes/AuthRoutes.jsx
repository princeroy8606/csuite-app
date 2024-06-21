import React from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "../components/auth/Auth";
import ResetPage from "../components/auth/ResetPage";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/reset-password" element={<ResetPage />} />
    </Routes>
  );
};

export default AuthRoutes;
