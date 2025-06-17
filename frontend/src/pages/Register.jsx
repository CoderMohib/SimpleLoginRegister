import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    dateOfBirth: "",
    password: "",
    gender: "",
  });
  const [errors, setErrors] = useState({});
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isMatch = formData.password === confirmPassword;
  const validateField = (name, value) => {
    let error = "";
    if (name === "username") {
      if (!value) error = "Username is required";
      else if (value.length < 3) error = "Must be at least 3 characters";
      else if (value.length > 15) error = "Must not exceed 15 characters";
    } else if (name === "email") {
      if (!value) error = "Email is required";
    } else if (name === "password") {
      if (!value) error = "Password is required";
      else if (value.length < 6) error = "Must be at least 6 characters";
    } else if (name === "dateOfBirth") {
      if (!value) error = "Date of birth is required";
    } else if (name === "gender") {
      if (!value) error = "Gender is required";
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
    if (name === "password" && value === "") {
      setConfirmPassword("");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (Object.keys(errors).length > 0) return;
    try {
      setIsSubmitting(true);
      await axios.post("http://localhost:3000/api/register", formData);
      toast.success("Registration successful!", {
        position: "top-right",
        autoClose: 3000,
      });
      setTimeout(() => {
        navigate("/login",{replace:true});
      }, 3000);
    } catch (err) {
      console.error(err);
      const errorMsg = err.response?.data?.message || "Registration failed";
      toast.error(errorMsg, {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasErrors = Object.values(errors).some((val) => val);
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 " >
      <div
        className="p-4 rounded shadow"
        style={{ width: "100%", maxWidth: "600px" }}

      >
        <h2 className="mb-4 text-center fw-bold">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col">
              <label className="form-label" htmlFor="userName">
                Username *
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className={`form-control ${
                  errors.username
                    ? "is-invalid"
                    : formData.username
                    ? "is-valid"
                    : ""
                }`}
                placeholder="John Doe"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col">
              <label className="form-label" htmlFor="email">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={`form-control ${
                  errors.email ? "is-invalid" : formData.email ? "is-valid" : ""
                }`}
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col">
              <label className="form-label" htmlFor="password">
                Password *
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className={`form-control ${
                  errors.password
                    ? "is-invalid"
                    : formData.password
                    ? "is-valid"
                    : ""
                }`}
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col">
              <label className="form-label" htmlFor="confirmPassword">
                Confirm Password *
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className={`form-control ${
                  confirmPassword ? (isMatch ? "is-valid" : "is-invalid") : ""
                }`}
                placeholder="Repeat Password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                required
                disabled={!formData.password}
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col">
              <label className="form-label" htmlFor="dob">
                Date of Birth *
              </label>
              <input
                type="date"
                id="dob"
                name="dateOfBirth"
                className={`form-control ${
                  errors.dateOfBirth
                    ? "is-invalid"
                    : formData.dateOfBirth
                    ? "is-valid"
                    : ""
                }`}
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col">
              <label className="form-label d-block">Gender *</label>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="Male"
                  value="Male"
                  checked={formData.gender === "Male"}
                  onChange={handleChange}
                  required
                />
                <label className="form-check-label" htmlFor="Male">
                  Male
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="Female"
                  value="Female"
                  checked={formData.gender === "Female"}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="Female">
                  Female
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="Other"
                  value="Other"
                  checked={formData.gender === "Other"}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="Other">
                  Other
                </label>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-center mb-3">
            <button
              type="submit"
              className="btn btn btn-dark px-4"
              disabled={
                !isMatch || !confirmPassword || isSubmitting || hasErrors
              }
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
        <div className="d-flex justify-content-center">
          <p className="small">
            Already have an account?{" "}
            <Link to="/login" className="text-decoration-none">
              Login
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
