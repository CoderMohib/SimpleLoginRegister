import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if(!token){
            navigate("/login", { replace: true });
        }
        const res = await axios.get("http://localhost:3000/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(res.data.user);
      } catch (err) {
        console.error("Error fetching profile", err);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.info("Logged out successfully", {
      position: "top-right",
      autoClose: 2000,
    });
    setTimeout(() => {
      navigate("/login", { replace: true });
    }, 2000);
  };

  if (!userData) {
    return <div className="text-center mt-5">Loading...</div>;
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
