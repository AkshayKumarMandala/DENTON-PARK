import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";

const AdminRoute = () => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (loading === false) {
      setIsLoading(false); // If the authentication state has been resolved
    }
  }, [loading]);

  if (isLoading) {
    return <div>Loading...</div>; // You could add a spinner or placeholder
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return isAdmin ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;
