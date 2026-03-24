import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (token) {
    // redirect based on role
    if (role === "admin") return <Navigate to="/admin/dashboard" />;
    if (role === "police") return <Navigate to="/police/dashboard" />;
    return <Navigate to="/user/dashboard" />;
  }

  return children;
};

export default PublicRoute;
