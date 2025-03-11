import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token"); // Recupera il token

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
