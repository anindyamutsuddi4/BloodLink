import React, { use } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from './AuthContext';

const Privateroute = ({ children }) => {
  const location = useLocation()
  const { user, loading } = use(AuthContext)
  if (loading) {
    return <div className="flex justify-center items-center h-screen">
      <span className="loading loading-infinity loading-xl"></span>
    </div>
  }
  if (user) {
    return children
  }
  return (
    <Navigate state={location?.pathname} to='/login'></Navigate>
  );
};

export default Privateroute;