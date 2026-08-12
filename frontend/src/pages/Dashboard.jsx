import { useEffect, useState } from "react";
import API from "../services/api";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardStats from "../components/dashboard/DashboardStats";
import QuickActions from "../components/dashboard/QuickActions";
import ActivityFeed from "../components/dashboard/ActivityFeed";

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [members, setMembers] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [projectRes, memberRes, taskRes] = await Promise.all([
        API.get("/projects"),
        API.get("/members"),
        API.get("/tasks"),
      ]);

      console.log("Projects:", projectRes.data);
      console.log("Members:", memberRes.data);
      console.log("Tasks:", taskRes.data);

      setProjects(projectRes.data);
      setMembers(memberRes.data);
      setTasks(taskRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const todoTasks = tasks.filter(
    (task) => task.status === "Todo"
  ).length;

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">

      <DashboardHeader />

      <div className="mt-6 lg:mt-8">
        <DashboardStats
          totalProjects={projects.length}
          totalMembers={members.length}
          totalTasks={tasks.length}
          completedTasks={completedTasks}
          inProgressTasks={inProgressTasks}
          todoTasks={todoTasks}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mt-6 lg:mt-8">

        <div className="lg:col-span-2">
          <QuickActions />
        </div>

       <div>
  <ActivityFeed
    projects={projects}
    members={members}
    tasks={tasks}
  />
</div>
      </div>

    </div>
  );
}

export default Dashboard;