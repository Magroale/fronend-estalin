import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children, allowedRoles }) => {
  const apiKey = localStorage.getItem("apiKey");
  const userRol = localStorage.getItem("userRol");

  // Si no hay apiKey, redirigir a login
  if (!apiKey) {
    return <Navigate to="/login" />;
  }

  // Si hay apiKey, verificar el rol
  if (allowedRoles && !allowedRoles.includes(userRol)) {
    return <Navigate to="/login" />;
  }

  return children;
};

