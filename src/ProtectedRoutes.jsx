import React from 'react';
import withAuth from './HOC/withAuth';
import AddPayment from './layouts/AddPayment/AddPayment';
import Dashboard from './layouts/Dashboard/Dashboard';

const ProtectedAddPayment = withAuth(AddPayment);
const ProtectedDashboard = withAuth(Dashboard);

export { ProtectedAddPayment, ProtectedDashboard };
