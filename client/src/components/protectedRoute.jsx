import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { isAuthenticated } from "../utils/auth";

const ProtectedRoute = ({ children }) => {
  const [authChecked, setAuthChecked] = useState(false);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = isAuthenticated();
      setAuth(authStatus);
      setAuthChecked(true);
    };
    checkAuth();
  }, []);

  if (!authChecked) {
    return <div>Loading...</div>; // Or a spinner
  }

  return auth ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;

