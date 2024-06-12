import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    React.useEffect(() => {
      if (!isAuthenticated) {
        navigate('/login');
      }
    }, [isAuthenticated, navigate]);

    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };
};

export default withAuth;
