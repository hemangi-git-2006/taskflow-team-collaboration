import { useState } from "react";
import { Outlet } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import AdminSidebar from "../components/dashboard/AdminSidebar";

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between bg-slate-950 text-white px-4 py-4">
        <h1 className="text-2xl font-bold text-teal-400">
          TaskFlow
        </h1>

        <button
          onClick={() => setSidebarOpen(true)}
          className="text-2xl"
        >
          <FaBars />
        </button>
      </div>

      <div className="flex min-h-screen">

        <AdminSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main className="flex-1 min-w-0">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default AdminLayout;