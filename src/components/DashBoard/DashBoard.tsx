import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/authSlice";
import { Outlet } from "react-router-dom";

const DashBoard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Sidebar */}
      <div className="w-1/4 p-6 flex flex-col justify-start items-start">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded w-full mb-2"
        >
          Logout
        </button>
        <button
          onClick={() => navigate("/dashboard/create-module")}
          className="px-4 py-2 bg-blue-500 text-white rounded w-full mb-2"
        >
          Create Module
        </button>
        <button
          onClick={() => navigate("/dashboard/modules")}
          className="px-4 py-2 bg-blue-500 text-white rounded w-full"
        >
          Module List
        </button>
      </div>

      {/* Right Content */}
      <div className="w-3/4 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default DashBoard;
