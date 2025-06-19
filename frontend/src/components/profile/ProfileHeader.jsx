import { useNavigate } from "react-router-dom";
export default function ProfileHeader({userName}) {
    const navigate = useNavigate();
  return (
    <div className="container-fluid shadow-sm py-2 fixed-top bg-black">
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-3 text-light">
          <i className="bi bi-person-circle fs-1 text-light"></i>
          <div>
            <h4 className="mb-0 fw-bold text-light">{userName}</h4>
            <small className="text-white-50">@{userName}</small>
          </div>
        </div>
        <button
          className="btn btn-dark border-0"
          onClick={() => navigate("/profile/settings")}
        >
          <i className="bi bi-gear-fill text-light fs-5"></i>
        </button>
      </div>
    </div>
  );
}
