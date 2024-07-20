import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AddPayment from './layouts/AddPayment/AddPayment'
import Dashboard from './layouts/Dashboard/Dashboard'
import TopAppBar from './layouts/TopAppBar/TopAppBar'
import Signup from './layouts/SignUp/SignUp'
import Login from './layouts/Login/Login'

import { ProtectedAddPayment, ProtectedDashboard } from './ProtectedRoutes';
import { useAuth } from './context/AuthContext'
import ForgotPassword from './layouts/ForgotPassword/ForgotPassword'
import ResetPassword from './layouts/ResetPassword/ResetPassword'

const RoutesComponent = () => {

    const { isAuthenticated } = useAuth();

    return (
        <BrowserRouter basename="/expense-tracker-app-React">
            <TopAppBar />
            <Routes>
                <Route path="/login" element={isAuthenticated ? <Navigate to="/addExpense" /> : <Login />} />
                <Route path="/signup" element={isAuthenticated ? <Navigate to="/addExpense" /> : <Signup />} />
                <Route path="/addExpense" element={<ProtectedAddPayment />} />
                <Route path="/dashboard" element={<ProtectedDashboard />} />
                <Route path="*" element={<Navigate to="/addExpense" />} />
                <Route path="/forgot-password" element={isAuthenticated ? <Navigate to="/addExpense" /> : <ForgotPassword />} />
                <Route path="/reset-password/:token" element={isAuthenticated ? <Navigate to="/addExpense" /> : <ResetPassword />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesComponent