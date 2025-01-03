import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";
import AuthCheckingComponent from "../components/Users/Alert/AuthCheckingComponent";

const AuthRoute = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated, isLoading, isError } = useAuth();
  if (isLoading) {
    return <AuthCheckingComponent />;
  }
  if (!isAuthenticated && !isLoading) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};
export default AuthRoute;
