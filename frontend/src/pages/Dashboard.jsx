import TopNavbar from "../components/layout/TopNavbar";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import StatsCards from "../components/dashboard/StatsCards";
import RecentProjects from "../components/dashboard/RecentProjects";
import UpcomingDeadlines from "../components/dashboard/UpcomingDeadlines";
import ActivityFeed from "../components/dashboard/ActivityFeed";

function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-100">

      {/* Top Navbar */}
      <TopNavbar />

      <div className="p-8 space-y-8">

        {/* Welcome Banner */}
        <DashboardHeader />

        {/* Statistics */}
        <StatsCards />

        {/* Projects + Deadlines */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

          <div className="xl:col-span-2">
            <RecentProjects />
          </div>

          <UpcomingDeadlines />

        </div>

        {/* Activity */}
        <ActivityFeed />

      </div>

    </div>
  );
}

export default Dashboard;