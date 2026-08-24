import {
  FaHome,
  FaTasks,
  FaFolder,
  FaUsers,
  FaUserCircle,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaComments,
} from "react-icons/fa";

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function EmployeeSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);

  // =========================
  // Sidebar Menu
  // =========================

  const menuItems = [
    {
      name: "Dashboard",
      path: "/employee-dashboard",
      icon: <FaHome />,
    },

    {
      name: "My Tasks",
      path: "/employee-tasks",
      icon: <FaTasks />,
    },

    {
      name: "Projects",
      path: "/employee-projects",
      icon: <FaFolder />,
    },

    {
      name: "Team Members",
      path: "/employee-team",
      icon: <FaUsers />,
    },

    // ✅ NEW - Comments
     {
  name: "Team Communication",
  path: "/employee-comments",
  icon: <FaComments />,
},

    {
      name: "Profile",
      path: "/employee-profile",
      icon: <FaUserCircle />,
    },
   
  ];

  // =========================
  // Menu Click
  // =========================

  const handleMenuClick = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  // =========================
  // Logout
  // =========================

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <>
      {/* ================================= */}
      {/* Mobile Header */}
      {/* ================================= */}

      <div
        className="
          lg:hidden
          fixed
          top-0
          left-0
          right-0
          h-16
          bg-slate-900
          z-[60]
          flex
          items-center
          justify-between
          px-5
          shadow-lg
        "
      >
        <h1 className="text-xl font-bold text-teal-400">
          TaskFlow
        </h1>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-white text-2xl"
        >
          {mobileOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* ================================= */}
      {/* Mobile Overlay */}
      {/* ================================= */}

      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="
            lg:hidden
            fixed
            inset-0
            bg-black/50
            z-40
          "
        />
      )}

      {/* ================================= */}
      {/* Sidebar */}
      {/* ================================= */}

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
        {/* ================================= */}
        {/* Logo */}
        {/* ================================= */}

        <div
          className="
            h-24
            flex
            flex-col
            justify-center
            px-8
            border-b
            border-slate-700
          "
        >
          <h1 className="text-3xl font-bold text-teal-400">
            TaskFlow
          </h1>

          <p className="text-sm text-slate-400 mt-1">
            Employee Panel
          </p>
        </div>

        {/* ================================= */}
        {/* Navigation */}
        {/* ================================= */}

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            /*
              Team Members should also remain active
              when viewing /member/:id
            */

            const isTeamMemberPage =
              item.path === "/employee-team" &&
              location.pathname.startsWith("/member/");

            const isActive =
              location.pathname === item.path ||
              isTeamMemberPage;

            return (
              <button
                key={item.path}
                onClick={() =>
                  handleMenuClick(item.path)
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

                  ${
                    isActive
                      ? "bg-teal-600 text-white shadow-md"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }
                `}
              >
                {/* Icon */}

                <span className="text-lg">
                  {item.icon}
                </span>

                {/* Name */}

                <span className="font-medium">
                  {item.name}
                </span>
              </button>
            );
          })}
        </nav>

        {/* ================================= */}
        {/* Logout */}
        {/* ================================= */}

        <div
          className="
            p-5
            border-t
            border-slate-700
          "
        >
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