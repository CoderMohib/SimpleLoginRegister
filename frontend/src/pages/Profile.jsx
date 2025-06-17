import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../utils/AuthProvider";
import axios from "axios";

export default function Profile() {
  const { logout, token } = useAuth();
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(res.data.user);
      } catch (err) {
        console.log("Error: ", err);
      }
    };

    fetchProfile();
  }, [token]);

  const handleLogout = () => {
    toast.info("Logged out successfully", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
    });
    setUserData(null);
    setTimeout(() => {
      logout();
    }, 2100);
  };

  if (!userData) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-muted"> </div>
        <ToastContainer />
      </div>
    );
  }
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="card shadow p-4"
        style={{ maxWidth: "500px", width: "100%" }}
      >
        <h3 className="card-title text-center mb-4">User Profile</h3>
        <div className="card-body">
          <p>
            <strong>Username:</strong> {userData.username}
          </p>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
          <p>
            <strong>Date of Birth:</strong>{" "}
            {new Date(userData.dateOfBirth).toLocaleDateString()}
          </p>
          <p>
            <strong>Gender:</strong> {userData.gender}
          </p>
          <p>
            <strong>Age:</strong> {userData.age}
          </p>
          <p>
            <strong>Joined:</strong>{" "}
            {new Date(userData.createdAt).toLocaleDateString()}
          </p>
        </div>
        <button className="btn btn-dark mt-3" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}
