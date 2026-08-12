import { useNavigate } from "react-router-dom";

function DashboardHeader() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/login");
  };

  return (
    <div className="bg-gradient-to-r from-teal-700 to-cyan-600 rounded-2xl lg:rounded-3xl p-5 sm:p-6 lg:p-8 text-white shadow-xl">

      {/* Logout Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleLogout}
          className="bg-white text-teal-700 px-5 py-2 rounded-lg font-semibold hover:bg-teal-50 transition"
        >
          Logout
        </button>
      </div>

      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
        Welcome Back 👋
      </h1>

      <p className="mt-2 sm:mt-3 text-base sm:text-lg text-teal-100 font-medium">
        {user?.fullName}
      </p>

      <p className="mt-2 text-sm sm:text-base text-teal-100 max-w-2xl">
        Manage your projects, team and tasks from one dashboard.
      </p>

    </div>
  );
}

export default DashboardHeader;