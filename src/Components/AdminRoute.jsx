import React from 'react';
import ForbiddenAccess from './ForbiddenAccess';
import useRole from './useRole';
import { Navigate } from 'react-router';

const AdminRoute = ({ children }) => {
    const { role, isLoading } = useRole()
    if (isLoading) {
        return  <div className="flex items-center justify-center min-h-[50vh] text-lg font-semibold">
        Checking permissions...
      </div>
    }

    if (role != "admin") {
    return <Navigate to="/forbidden" replace />;
  }
    return children
};

export default AdminRoute;