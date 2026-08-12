import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaFolder,
  FaTasks,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

import API from "../services/api";
import EmployeeSidebar from "../components/employee/EmployeeSidebar";

function EmployeeProjects() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);

      /*
       * We are getting the member's tasks.
       * From those tasks we can determine
       * which projects belong to this member.
       */

      const res = await API.get(
        `/tasks/member/${user._id}`
      );

      const tasks = res.data || [];

      const uniqueProjects = [];

      tasks.forEach((task) => {
        if (!task.project) return;

        const alreadyExists =
          uniqueProjects.find(
            (project) =>
              project._id === task.project._id
          );

        if (!alreadyExists) {
          uniqueProjects.push({
            ...task.project,
            tasks: [],
          });
        }
      });

      /*
       * Put tasks inside their project
       */

      tasks.forEach((task) => {
        if (!task.project) return;

        const project =
          uniqueProjects.find(
            (project) =>
              project._id === task.project._id
          );

        if (project) {
          project.tasks.push(task);
        }
      });

      setProjects(uniqueProjects);

    } catch (error) {
      console.log(
        "Error fetching projects:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const openProject = (projectId) => {
    navigate(
      `/employee-projects/${projectId}`
    );
  };

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Sidebar */}

      <EmployeeSidebar />

      {/* Main */}

      <main
        className="
          lg:ml-64
          min-h-screen
          pt-20
          lg:pt-0
        "
      >

        <div className="p-4 sm:p-6 lg:p-8">

          {/* Header */}

          <div className="mb-8">

            <h1
              className="
                text-3xl
                sm:text-4xl
                font-bold
                text-slate-800
              "
            >
              My Projects
            </h1>

            <p className="text-slate-500 mt-2">
              Projects you are working on
            </p>

          </div>

          {/* Loading */}

          {loading ? (

            <div className="bg-white rounded-2xl p-12 text-center shadow">

              <p className="text-slate-500">
                Loading projects...
              </p>

            </div>

          ) : projects.length === 0 ? (

            /* No Projects */

            <div
              className="
                bg-white
                rounded-2xl
                shadow
                p-12
                text-center
              "
            >

              <FaFolder
                className="
                  text-6xl
                  text-slate-300
                  mx-auto
                  mb-5
                "
              />

              <h2 className="text-2xl font-bold text-slate-700">
                No Projects Found
              </h2>

              <p className="text-slate-500 mt-2">
                You are not assigned to any project yet.
              </p>

            </div>

          ) : (

            /* Projects */

            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                xl:grid-cols-3
                gap-6
              "
            >

              {projects.map((project) => {

                const projectTasks =
                  project.tasks || [];

                const completed =
                  projectTasks.filter(
                    (task) =>
                      task.status ===
                      "Completed"
                  ).length;

                const total =
                  projectTasks.length;

                const progress =
                  total === 0
                    ? 0
                    : Math.round(
                        (completed / total) *
                          100
                      );

                return (

                  <div
                    key={project._id}
                    onClick={() =>
                      openProject(
                        project._id
                      )
                    }
                    className="
                      bg-white
                      rounded-2xl
                      border
                      border-slate-200
                      shadow-sm
                      p-6
                      cursor-pointer
                      hover:shadow-xl
                      hover:-translate-y-1
                      transition-all
                      duration-200
                    "
                  >

                    {/* Project Icon */}

                    <div className="flex items-start justify-between">

                      <div
                        className="
                          w-14
                          h-14
                          rounded-xl
                          bg-teal-100
                          text-teal-600
                          flex
                          items-center
                          justify-center
                          text-2xl
                        "
                      >
                        <FaFolder />
                      </div>

                      <span
                        className="
                          text-sm
                          font-semibold
                          text-teal-600
                          bg-teal-50
                          px-3
                          py-1
                          rounded-full
                        "
                      >
                        View Project
                      </span>

                    </div>

                    {/* Name */}

                    <h2
                      className="
                        text-xl
                        font-bold
                        text-slate-800
                        mt-5
                      "
                    >
                      {project.name}
                    </h2>

                    {/* Description */}

                    <p
                      className="
                        text-slate-500
                        text-sm
                        mt-2
                        line-clamp-2
                      "
                    >
                      {project.description ||
                        "No project description"}
                    </p>

                    {/* Task Stats */}

                    <div
                      className="
                        grid
                        grid-cols-2
                        gap-3
                        mt-6
                      "
                    >

                      <div
                        className="
                          bg-slate-50
                          rounded-xl
                          p-4
                        "
                      >

                        <FaTasks className="text-blue-500 mb-2" />

                        <p className="text-xs text-slate-500">
                          Tasks
                        </p>

                        <p className="text-xl font-bold">
                          {total}
                        </p>

                      </div>

                      <div
                        className="
                          bg-slate-50
                          rounded-xl
                          p-4
                        "
                      >

                        <FaCheckCircle className="text-green-500 mb-2" />

                        <p className="text-xs text-slate-500">
                          Completed
                        </p>

                        <p className="text-xl font-bold">
                          {completed}
                        </p>

                      </div>

                    </div>

                    {/* Progress */}

                    <div className="mt-6">

                      <div className="flex justify-between mb-2">

                        <span className="text-sm text-slate-500">
                          Progress
                        </span>

                        <span className="text-sm font-semibold text-teal-600">
                          {progress}%
                        </span>

                      </div>

                      <div
                        className="
                          w-full
                          h-2
                          bg-slate-200
                          rounded-full
                          overflow-hidden
                        "
                      >

                        <div
                          className="
                            h-full
                            bg-teal-500
                            rounded-full
                            transition-all
                          "
                          style={{
                            width: `${progress}%`,
                          }}
                        />

                      </div>

                    </div>

                    {/* Deadline */}

                    <div className="mt-5 flex items-center gap-2 text-sm text-slate-500">

                      <FaClock />

                      <span>
                        Deadline:{" "}
                        {project.deadline
                          ? new Date(
                              project.deadline
                            ).toLocaleDateString()
                          : "Not set"}
                      </span>

                    </div>

                  </div>

                );
              })}

            </div>

          )}

        </div>

      </main>

    </div>
  );
}

export default EmployeeProjects;