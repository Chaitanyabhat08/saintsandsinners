import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Route, Routes } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
    const navigate = useNavigate();
    const { loading, isAuthenticated, user } = useSelector((state) => state.user);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!isAuthenticated) {
        navigate("/users/loginUser");
        return null;
    }

    if (isAdmin && user.role !== "admin") {
        navigate("/users/loginUser");
        return null;
    }

    return (
        <Routes>
            <Route {...rest} element={<Component />} />
        </Routes>
    );
};

export default ProtectedRoute;
