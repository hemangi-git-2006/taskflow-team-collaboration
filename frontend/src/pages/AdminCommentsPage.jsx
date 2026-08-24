import AdminSidebar from "../components/dashboard/AdminSidebar";
import AdminComments from "../components/AdminComments";

function AdminCommentsPage() {
  return (
    <div className="flex min-h-screen bg-slate-100">

      {/* Admin Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        <AdminComments />
      </main>

    </div>
  );
}

export default AdminCommentsPage;