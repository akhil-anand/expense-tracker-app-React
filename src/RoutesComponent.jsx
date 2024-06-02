import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AddPayment from './layouts/AddPayment/AddPayment'
import Dashboard from './layouts/Dashboard/Dashboard'
import TopAppBar from './layouts/TopAppBar/TopAppBar'

const RoutesComponent = () => {
    return (
        <BrowserRouter basename="/expense-tracker-app-React">
        <TopAppBar />
            <Routes>
                <Route path="/addExpense" element={<AddPayment />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="*" element={<Navigate to="/addExpense" />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesComponent