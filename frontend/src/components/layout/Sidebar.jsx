import {
  FaHome,
  FaFolderOpen,
  FaTasks,
  FaUsers,
  FaCalendarAlt,
  FaBell,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const menuItems = [
  { title: "Dashboard", path: "/dashboard", icon: <FaHome /> },
  { title: "Projects", path: "/projects", icon: <FaFolderOpen /> },
  { title: "My Tasks", path: "/tasks", icon: <FaTasks /> },
  { title: "Members", path: "/members", icon: <FaUsers /> },
  { title: "Calendar", path: "/calendar", icon: <FaCalendarAlt /> },
  { title: "Notifications", path: "/notifications", icon: <FaBell /> },
  { title: "Settings", path: "/settings", icon: <FaCog /> },
];

function Sidebar() {
  return (
    <aside className="w-72 h-screen bg-slate-900 text-white flex flex-col">

      <div className="p-6 border-b border-slate-700">
        <h1 className="text-3xl font-bold text-teal-400">
          TaskFlow
        </h1>
      </div>

      <div className="p-6">

        <div className="bg-slate-800 rounded-2xl p-5 mb-8">

          <div className="w-16 h-16 rounded-full bg-teal-500 flex items-center justify-center text-2xl font-bold">
            H
          </div>

          <h2 className="mt-4 text-xl font-semibold">
            Hemangi
          </h2>

          <p className="text-slate-400">
            Project Admin
          </p>

        </div>

        <nav className="space-y-2">

          {menuItems.map((item) => (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-5 py-3 rounded-xl transition ${
                  isActive
                    ? "bg-teal-600"
                    : "hover:bg-slate-800"
                }`
              }
            >
              {item.icon}
              {item.title}
            </NavLink>
          ))}

        </nav>

      </div>

      <button className="mt-auto p-6 flex items-center gap-3 hover:bg-red-600 transition">
        <FaSignOutAlt />
        Logout
      </button>

    </aside>
  );
}

export default Sidebar;