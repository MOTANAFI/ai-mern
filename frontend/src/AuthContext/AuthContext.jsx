import { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { checkUserAuthStatusApi } from "../apis/user/usersAPI";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const { isError, isLoading, data, isSuccess } = useQuery({
    queryFn: checkUserAuthStatusApi,
    queryKey: ["checkAuth"],
  });
  //update the authenticated user
  useEffect(() => {
    setisAuthenticated(true);
  }, [data]);
  //update the user auth after login

  const login = () => {
    setisAuthenticated(true);
  };
  //update the user after log out
  const logout = () => {
    setisAuthenticated(false);
  };
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isError, isLoading, isSuccess, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook

export const useAuth = () => {
    return useContext(AuthContext)
}
