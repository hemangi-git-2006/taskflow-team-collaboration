import {
  FaHome,
  FaTasks,
  FaFolder,
  FaUsers,
  FaUserCircle,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function EmployeeSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    {
      name: "Dashboard",
      icon: <FaHome />,
      path: "/employee-dashboard",
    },
    {
      name: "My Tasks",
      icon: <FaTasks />,
      path: "/employee-dashboard",
    },
    {
      name: "Projects",
      icon: <FaFolder />,
      path: "/employee-dashboard",
    },
    {
      name: "Team Members",
      icon: <FaUsers />,
      path: "/employee-dashboard",
    },
    {
      name: "Profile",
      icon: <FaUserCircle />,
      path: "/employee-dashboard",
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <>
      {/* =========================
          Mobile Top Bar
      ========================= */}

      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-slate-900 z-[60] flex items-center justify-between px-4 shadow-lg">

        <h1 className="text-xl font-bold text-teal-400">
          TaskFlow
        </h1>

        <button
          onClick={() =>
            setMobileOpen(!mobileOpen)
          }
          className="text-white text-2xl"
        >
          {mobileOpen ? (
            <FaTimes />
          ) : (
            <FaBars />
          )}
        </button>

      </div>

      {/* =========================
          Mobile Overlay
      ========================= */}

      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
        />
      )}

      {/* =========================
          Sidebar
      ========================= */}

      <aside
        className={`
          fixed
          left-0
          top-0
          h-screen
          w-64
          bg-slate-900
          text-white
          z-50
          flex
          flex-col
          transition-transform
          duration-300
          
          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >

        {/* =========================
            Logo
        ========================= */}

        <div className="h-24 flex flex-col justify-center px-8 border-b border-slate-700">

          <h1 className="text-3xl font-bold text-teal-400">
            TaskFlow
          </h1>

          <p className="text-sm text-slate-400 mt-1">
            Employee Panel
          </p>

        </div>

        {/* =========================
            Navigation
        ========================= */}

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">

          {menuItems.map((item) => {

            const isActive =
              location.pathname === item.path;

            return (
              <button
                key={item.name}
                onClick={() =>
                  handleNavigation(item.path)
                }
                className={`
                  w-full
                  flex
                  items-center
                  gap-4
                  px-5
                  py-4
                  rounded-xl
                  text-left
                  transition-all
                  duration-200
                  
                  ${
                    isActive
                      ? "bg-teal-600 text-white shadow-lg"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }
                `}
              >

                <span className="text-lg">
                  {item.icon}
                </span>

                <span className="font-medium">
                  {item.name}
                </span>

              </button>
            );

          })}

        </nav>

        {/* =========================
            Logout
        ========================= */}

        <div className="p-5 border-t border-slate-700">

          <button
            onClick={logout}
            className="
              w-full
              flex
              items-center
              justify-center
              gap-3
              bg-red-500
              hover:bg-red-600
              text-white
              py-3.5
              rounded-xl
              font-semibold
              transition
            "
          >

            <FaSignOutAlt />

            Logout

          </button>

        </div>

      </aside>
    </>
  );
}

export default EmployeeSidebar;