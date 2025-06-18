import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./utils/AuthProvider";
import PrivateRoutes from "./utils/PrivateRoutes";
import axios from "axios";

function App() {
  // axios.interceptors.response.use(
  //   (response) => response,
  //   async (error) => {
  //     console.log("Axios", error);
  //     if (error.response && error.response.status === 401) {
  //       console.log("inside");
  //       localStorage.removeItem("token");
  //       window.location.href = "/login";
  //     }
  //     return Promise.reject(error);
  //   }
  // );
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
