import React from "react";
import { Navigate, Outlet } from "react-router-dom";
const PrivateRoute = () => {
    try {
        const user = localStorage.getItem("token")
        return user ? <Outlet /> : <Navigate to="/login" replace />;          
    } catch (error) {
        console.log(error)
    }

};

export default PrivateRoute;
