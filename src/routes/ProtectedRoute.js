import React from 'react'
import { Navigate } from 'react-router-dom';
import UserService from '../service/UserService';

export const ProtectedRoute = ({ children }) => {

    const isAuthenticated = UserService.isAuthenticated();

    if (isAuthenticated) {
        return <Navigate to="/patients" />;
    }

    return children;

}
