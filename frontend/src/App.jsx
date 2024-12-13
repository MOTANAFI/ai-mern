import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registration from "./components/Users/Register";
import Login from "./components/Users/Login";
import Dashboard from "./components/Users/Dashboard";
import PublicNavbar from "./components/Navbar/PublicNavbar";
import PrivateNavbar from "./components/Navbar/PrivateNavbar";
import Home from "./components/Home/Home";
import { useAuth } from "./AuthContext/AuthContext";

export default function App() {
  const { isAuthenticated } = useAuth();
  return (
    <>
      <BrowserRouter>
      {/* navbar */}
      {/* <PublicNavbar /> */}
      {isAuthenticated ? <PrivateNavbar /> : <PublicNavbar />}
        <Routes>
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
