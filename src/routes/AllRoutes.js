import React from 'react'
import UserService from "../service/UserService";
import { Routes, Route } from "react-router-dom";
import { Login } from '../components/Login';
import { Home, Patients } from '../pages';
import { ProtectedRoute } from "./ProtectedRoute";
import { UnauthorizedAccess } from "../pages/UnauthorizedAccess";
import { Registration } from '../components';

export const AllRoutes = () => {

    const isAuthenticated = UserService.isAuthenticated();

    return (
        <>
            <Routes>
                <Route path="/" element={
                    <ProtectedRoute>
                        <Login />
                    </ProtectedRoute>
                } />
                <Route path="/login" element={
                    <ProtectedRoute>
                        <Login />
                    </ProtectedRoute>
                } />
                <Route path="*" element={
                    <ProtectedRoute>
                        <UnauthorizedAccess />
                    </ProtectedRoute>
                } />
                <Route path="/registration" element={<Registration />} />
                {isAuthenticated && <Route path="/home" element={<Home />} />}
                {isAuthenticated && <Route path= "/patients" element={<Patients />} />}
            </Routes>
        </>
    )
}
