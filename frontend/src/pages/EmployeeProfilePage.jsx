import { useEffect, useState } from "react";

import API from "../services/api";

import EmployeeSidebar from "../components/employee/EmployeeSidebar";
import EmployeeProfile from "../components/employee/EmployeeProfile";

function EmployeeProfilePage() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {

      const res = await API.get(
        `/tasks/member/${user._id}`
      );

      const uniqueProjects = [];

      res.data.forEach((task) => {

        if (
          task.project &&
          !uniqueProjects.find(
            (project) =>
              project._id === task.project._id
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
        "GET PROFILE PROJECTS ERROR:",
        error
      );

    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (

    <div className="min-h-screen bg-slate-100">

      {/* Sidebar */}

      <EmployeeSidebar />

      {/* Main Content */}

      <main
        className="
          lg:ml-64
          min-h-screen
          pt-16
          lg:pt-0
        "
      >

        <div className="p-4 sm:p-6 lg:p-8">

          <div className="mb-8">

            <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
              My Profile
            </h1>

            <p className="text-slate-500 mt-2">
              View your personal and employee information
            </p>

          </div>

          <EmployeeProfile
            user={user}
            totalProjects={projects.length}
          />

        </div>

      </main>

    </div>

  );
}

export default EmployeeProfilePage;