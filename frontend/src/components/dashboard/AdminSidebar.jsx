import {
  FaHome,
  FaFolder,
  FaUsers,
  FaComments,
  FaUser,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";

import { useNavigate, useLocation } from "react-router-dom";

function AdminSidebar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      icon: <FaHome />,
      path: "/dashboard",
    },
    {
      name: "Projects",
      icon: <FaFolder />,
      path: "/projects",
    },
    {
      name: "Team Members",
      icon: <FaUsers />,
      path: "/team-members",
    },
    {
      name: "Team Communication",
      icon: <FaComments />,
      path: "/admin-comments",
    },
    {
      name: "Profile",
      icon: <FaUser />,
      path: "/profile",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/login");
  };

  const handleNavigation = (path) => {
    navigate(path);

    // Close sidebar on mobile
    if (setSidebarOpen) {
      setSidebarOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      <aside
        className={`
          fixed md:sticky
          top-0 left-0
          z-50
          w-72
          h-screen
          bg-slate-950
          text-white
          flex flex-col
          transform
          transition-transform
          duration-300

          ${sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
          }
        `}
      >

        {/* Logo */}
        <div className="px-8 py-7 border-b border-slate-800 flex items-start justify-between">

          <div>
            <h1 className="text-3xl font-bold text-teal-400">
              TaskFlow
            </h1>

            <p className="text-slate-400 mt-1">
              Admin Panel
            </p>
          </div>

          {/* Close button - mobile only */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-slate-300 text-xl"
          >
            <FaTimes />
          </button>

        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto">

          <div className="space-y-3">

            {menuItems.map((item) => {

              const isActive = location.pathname === item.path;

              return (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.path)}
                  className={`
                    w-full
                    flex
                    items-center
                    gap-4
                    px-5
                    py-4
                    rounded-xl
                    text-left
                    font-semibold
                    transition-all
                    duration-300

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

                  <span>
                    {item.name}
                  </span>

                </button>
              );

            })}

          </div>

        </nav>

        {/* Logout */}
        <div className="p-5 border-t border-slate-800">

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 text-white py-4 rounded-xl font-semibold transition-all duration-300"
          >

            <FaSignOutAlt />

            Logout

          </button>

        </div>

      </aside>
    </>
  );
}

export default AdminSidebar;