import React from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children, condition, redirect }) => {
  const rule = condition || (() => localStorage.getItem('token'));
  
  return rule() ? (
    <>{children}</>
  ) : (
    <Navigate to={`/${redirect ? redirect : 'login'}`} replace={true} />
  );
};
