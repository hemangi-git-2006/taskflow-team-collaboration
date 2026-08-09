import { useEffect, useMemo, useState } from "react";
import API from "../services/api";

import EmployeeSidebar from "../components/employee/EmployeeSidebar";
import EmployeeHeader from "../components/employee/EmployeeHeader";
import EmployeeStats from "../components/employee/EmployeeStats";
import EmployeeProjectSelector from "../components/employee/EmployeeProjectSelector";
import EmployeeTaskList from "../components/employee/EmployeeTaskList";
import EmployeeTeam from "../components/employee/EmployeeTeam";
import EmployeeProfile from "../components/employee/EmployeeProfile";
import EmployeeActivity from "../components/employee/EmployeeActivity";

function EmployeeDashboard() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [members, setMembers] = useState([]);

  const [selectedProject, setSelectedProject] =
    useState("");

  // ============================
  // Fetch Dashboard
  // ============================

  const fetchDashboard = async () => {

    try {

      if (!user?._id) {
        return;
      }

      const res = await API.get(
        `/tasks/member/${user._id}`
      );

      const taskData = res.data || [];

      setTasks(taskData);

      // Get unique projects
      const uniqueProjects = [];

      taskData.forEach((task) => {

        if (
          task.project &&
          !uniqueProjects.some(
            (project) =>
              project._id ===
              task.project._id
          )
        ) {

          uniqueProjects.push(
            task.project
          );

        }

      });

      setProjects(uniqueProjects);

    } catch (error) {

      console.log(
        "Dashboard Error:",
        error
      );

    }

  };

  // ============================
  // Initial Fetch
  // ============================

  useEffect(() => {

    fetchDashboard();

  }, []);

  // ============================
  // Get Team Members
  // ============================

  const getMembers = async () => {

    try {

      if (!selectedProject) {

        setMembers([]);

        return;

      }

      const res = await API.get(
        `/members/${selectedProject}`
      );

      setMembers(
        res.data || []
      );

    } catch (error) {

      console.log(
        "Members Error:",
        error
      );

      setMembers([]);

    }

  };

  useEffect(() => {

    getMembers();

  }, [selectedProject]);

  // ============================
  // Filter Tasks
  // ============================

  const filteredTasks = useMemo(() => {

    if (!selectedProject) {

      return tasks;

    }

    return tasks.filter(
      (task) =>
        task.project?._id ===
        selectedProject
    );

  }, [
    tasks,
    selectedProject,
  ]);

  // ============================
  // Statistics
  // ============================

  const completedTasks =
    filteredTasks.filter(
      (task) =>
        task.status === "Completed"
    ).length;

  const pendingTasks =
    filteredTasks.filter(
      (task) =>
        task.status !== "Completed"
    ).length;

  return (

    <div className="min-h-screen bg-slate-100">

      {/* Sidebar */}

      <EmployeeSidebar />

      {/* Main Content */}

      <main
        className="
          min-h-screen
          ml-0
          lg:ml-64
          pt-20
          lg:pt-6
          px-4
          sm:px-6
          lg:px-8
          pb-10
        "
      >

        <div
          className="
            w-full
            max-w-[1600px]
            mx-auto
            space-y-8
          "
        >

          {/* Header */}

          <EmployeeHeader />

          {/* Statistics */}

          <EmployeeStats
            totalTasks={
              filteredTasks.length
            }
            completedTasks={
              completedTasks
            }
            pendingTasks={
              pendingTasks
            }
            totalProjects={
              projects.length
            }
          />

          {/* Projects */}

          <EmployeeProjectSelector
            projects={projects}
            tasks={tasks}
            selectedProject={
              selectedProject
            }
            setSelectedProject={
              setSelectedProject
            }
          />

          {/* Tasks */}

          <EmployeeTaskList
            tasks={filteredTasks}
            projects={projects}
            refreshTasks={
              fetchDashboard
            }
          />

          {/* Team */}

          <EmployeeTeam
            members={members}
          />

          {/* Activity */}

          <EmployeeActivity
            tasks={filteredTasks}
          />

          {/* Profile */}

          <EmployeeProfile
            user={user}
            totalProjects={
              projects.length
            }
          />

        </div>

      </main>

    </div>

  );
}

export default EmployeeDashboard;