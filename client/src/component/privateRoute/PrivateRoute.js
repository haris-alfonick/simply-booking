
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ allowedRole }) => {
    try {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) return <Navigate to="/login" replace />;
        const user = JSON.parse(storedUser);
        if (allowedRole !== undefined && user.role !== allowedRole) {
            return <Navigate to={user.role === 1 ? "/maindashboard" : "/clientdashboard"} replace />
        }
        return <Outlet />;
    } catch (error) {
        console.log(error);
        return <Navigate to="/login" replace />;
    }
};

export default PrivateRoute;
