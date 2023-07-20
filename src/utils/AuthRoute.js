import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const AuthRoute = ({ path, isAuthenticated, userType, element }) => {
  const isUserAuthenticated = isAuthenticated && userType !== '';

  const getLoginRoute = () => {
    switch (userType) {
      case 'owner':
        return '/ownerlogin';
      case 'admin':
        return '/adminlogin';
      case 'doctor':
        return '/doctorlogin';
      default:
        return '/login';
    }
  };

  return isUserAuthenticated ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to={getLoginRoute()} replace />
  );
};

export default AuthRoute;
