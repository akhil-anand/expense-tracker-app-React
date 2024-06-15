import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AddPayment from './layouts/AddPayment/AddPayment'
import Dashboard from './layouts/Dashboard/Dashboard'
import TopAppBar from './layouts/TopAppBar/TopAppBar'
import Signup from './layouts/SignUp/SignUp'
import Login from './layouts/Login/Login'

import { ProtectedAddPayment, ProtectedDashboard } from './ProtectedRoutes';
import { useAuth } from './context/AuthContext'

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
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesComponent