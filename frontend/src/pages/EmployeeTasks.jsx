import { useEffect, useState } from "react";
import API from "../services/api";

import EmployeeSidebar from "../components/employee/EmployeeSidebar";
import EmployeeTaskList from "../components/employee/EmployeeTaskList";

function EmployeeTasks() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);

  // =====================================
  // Fetch Employee Tasks
  // =====================================

  const fetchTasks = async () => {
    try {
      if (!user?._id) {
        console.log("User not found");
        return;
      }

      const res = await API.get(
        `/tasks/member/${user._id}`
      );

      const taskData = Array.isArray(res.data)
        ? res.data
        : [];

      setTasks(taskData);

      // =====================================
      // Create Unique Project List
      // =====================================

      const uniqueProjects = [];

      taskData.forEach((task) => {
        if (
          task.project &&
          !uniqueProjects.find(
            (project) =>
              project._id === task.project._id
          )
        ) {
          uniqueProjects.push(task.project);
        }
      });

      setProjects(uniqueProjects);

    } catch (error) {
      console.log(
        "FETCH EMPLOYEE TASKS ERROR:",
        error
      );

      setTasks([]);
      setProjects([]);
    }
  };

  // =====================================
  // Load Tasks
  // =====================================

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100">

      {/* ================================= */}
      {/* Sidebar */}
      {/* ================================= */}

      <EmployeeSidebar />


      {/* ================================= */}
      {/* Main Content */}
      {/* ================================= */}

      <main
        className="
          lg:ml-64
          min-h-screen
          pt-20
          lg:pt-0
        "
      >

        <div
          className="
            w-full
            px-4
            sm:px-6
            lg:px-8
            xl:px-10
            py-6
            lg:py-8
          "
        >

          {/* ================================= */}
          {/* Task Section */}
          {/* ================================= */}

          <div className="max-w-7xl mx-auto">

            <EmployeeTaskList
              tasks={tasks}
              projects={projects}
              refreshTasks={fetchTasks}
            />

          </div>

        </div>

      </main>

    </div>
  );
}

export default EmployeeTasks;