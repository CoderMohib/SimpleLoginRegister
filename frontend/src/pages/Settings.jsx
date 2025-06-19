import { useAuth } from "../utils/AuthProvider";
import { showError, showInfo, showSuccess } from "../utils/toastUtils";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { logout, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      showError("Session expired! Please login again.");
      logout();
    } else {
      const timer = setTimeout(() => setIsLoading(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, logout, navigate]);

  const handleLogout = () => {
    setIsLoading(true);
    showInfo("Logging out...");
    setTimeout(() => {
      logout();
      navigate("/login");
    }, 2000);
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const res = await axios.delete("http://localhost:3000/api/profile/delete");
      showSuccess(res.data?.message || "Account deleted successfully");
      setTimeout(() => {
        logout();
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error("Delete failed:", err);
      if (err.response?.status === 403) {
        showError("Session expired! Logging out...");
        logout();
        navigate("/login");
      } else {
        showError("Failed to delete account");
        setIsLoading(false);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-muted" role="status" />
      </div>
    );
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ maxWidth: "300px", width: "100%" }}>
        <button className="btn btn-dark mt-3" onClick={handleLogout}>
          Logout
        </button>
        <button className="btn btn-danger mt-3" onClick={handleDelete}>
          Delete your account!
        </button>
      </div>
    </div>
  );
}
