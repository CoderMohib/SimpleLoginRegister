import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../utils/AuthProvider";
import { showError } from "../utils/toastUtils";

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/profile", { replace: true });
    }
  }, [isAuthenticated]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/login", formData);
      const { token, refreshToken } = res.data;
      login(token, refreshToken);
      setFormData({
        email: "",
        password: "",
      });
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Login failed. Please try again.";
      showError(errorMessage);
      setFormData((prev) => ({
        ...prev,
        password: "",
      }));
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="p-4 rounded shadow"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h2 className="mb-4 text-center fw-bolder">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label" htmlFor="email">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="johndoe@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="password">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              placeholder="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="d-flex justify-content-center mb-3">
            <button type="submit" className="btn btn-dark px-4">
              Login
            </button>
          </div>
        </form>
        <div className="d-flex">
          <p className="small">
            Don't have an account?{" "}
            <Link to="/register" className="text-decoration-none pe-auto">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
