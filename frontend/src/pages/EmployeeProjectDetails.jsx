import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeShareTask from "../components/employee/EmployeeShareTask";

import {
  FaArrowLeft,
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaFolder,
  FaTasks,
  FaUsers,
  FaUser,
  FaImage,
  FaTimes,
} from "react-icons/fa";

import API from "../services/api";
import EmployeeSidebar from "../components/employee/EmployeeSidebar";

function EmployeeProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [taskDateFilter, setTaskDateFilter] = useState("All");

  // Image popup
  const [selectedImage, setSelectedImage] = useState(null);

  // ============================
  // Fetch Project + Tasks
  // ============================

  useEffect(() => {
    fetchProjectDetails();
  }, [id]);

  const fetchProjectDetails = async () => {
    try {
      setLoading(true);

      // Get project details
      const projectRes = await API.get(
        `/projects/${id}`
      );

      setProject(projectRes.data);

      // Get ALL tasks of this project
      const taskRes = await API.get(
        `/tasks/project/${id}`
      );

      setTasks(taskRes.data);

    } catch (error) {
      console.log(
        "Error loading project:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // Refresh Tasks
  // ============================

  const refreshTasks = () => {
    fetchProjectDetails();
  };

  // ============================
  // Status Color
  // ============================

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";

      case "In Progress":
        return "bg-blue-100 text-blue-700";

      default:
        return "bg-orange-100 text-orange-700";
    }
  };

  // ============================
  // Priority Color
  // ============================

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-700";

      case "Medium":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-green-100 text-green-700";
    }
  };

  const filteredProjectTasks = tasks.filter((task) => {
    if (taskDateFilter === "All") {
      return true;
    }

    if (!task.deadline) {
      return false;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const taskDate = new Date(task.deadline);
    taskDate.setHours(0, 0, 0, 0);

    switch (taskDateFilter) {
      case "Today":
        return taskDate.getTime() === today.getTime();

      case "Yesterday": {
        const yesterday = new Date(today);

        yesterday.setDate(
          today.getDate() - 1
        );

        return (
          taskDate.getTime() ===
          yesterday.getTime()
        );
      }

      case "Last 7 Days": {
        const last7Days = new Date(today);

        last7Days.setDate(
          today.getDate() - 6
        );

        return (
          taskDate >= last7Days &&
          taskDate <= today
        );
      }

      case "This Month":
        return (
          taskDate.getMonth() ===
            today.getMonth() &&
          taskDate.getFullYear() ===
            today.getFullYear()
        );

      default:
        return true;
    }
  });

  // ============================
  // Loading
  // ============================

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100">

        <EmployeeSidebar />

        <main className="lg:ml-64 pt-20 lg:pt-0">

          <div className="min-h-screen flex items-center justify-center">

            <p className="text-slate-500 text-lg">
              Loading project...
            </p>

          </div>

        </main>

      </div>
    );
  }

  // ============================
  // Project Not Found
  // ============================

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-100">

        <EmployeeSidebar />

        <main className="lg:ml-64 pt-20 lg:pt-0">

          <div className="p-6">

            <div className="bg-white rounded-2xl p-10 text-center">

              <h2 className="text-2xl font-bold text-slate-700">
                Project Not Found
              </h2>

              <button
                onClick={() =>
                  navigate("/employee-projects")
                }
                className="
                  mt-5
                  bg-teal-600
                  hover:bg-teal-700
                  text-white
                  px-5
                  py-3
                  rounded-xl
                "
              >
                Back to Projects
              </button>

            </div>

          </div>

        </main>

      </div>
    );
  }

  // ============================
  // Statistics
  // ============================

  const completedTasks =
    tasks.filter(
      (task) =>
        task.status === "Completed"
    ).length;

  const pendingTasks =
    tasks.filter(
      (task) =>
        task.status !== "Completed"
    ).length;

  const progress =
    tasks.length === 0
      ? 0
      : Math.round(
          (completedTasks / tasks.length) *
            100
        );

  return (
    <div className="min-h-screen bg-slate-100">

      {/* ============================
          Sidebar
      ============================ */}

      <EmployeeSidebar />

      {/* ============================
          Main Content
      ============================ */}

      <main
        className="
          lg:ml-64
          min-h-screen
          pt-20
          lg:pt-0
        "
      >

        <div className="p-4 sm:p-6 lg:p-8">

          {/* ============================
              Back Button
          ============================ */}

          <button
            onClick={() =>
              navigate("/employee-projects")
            }
            className="
              flex
              items-center
              gap-2
              text-slate-600
              hover:text-teal-600
              font-medium
              mb-6
            "
          >
            <FaArrowLeft />

            Back to Projects
          </button>

          {/* ============================
              Project Header
          ============================ */}

          <div
            className="
              bg-white
              rounded-3xl
              shadow-sm
              border
              border-slate-200
              p-6
              sm:p-8
              mb-8
            "
          >

            <div
              className="
                flex
                flex-col
                lg:flex-row
                lg:items-start
                lg:justify-between
                gap-6
              "
            >

              {/* Project Info */}

              <div className="flex gap-5">

                <div
                  className="
                    w-16
                    h-16
                    rounded-2xl
                    bg-teal-100
                    text-teal-600
                    flex
                    items-center
                    justify-center
                    text-3xl
                    shrink-0
                  "
                >
                  <FaFolder />
                </div>

                <div>

                  <h1
                    className="
                      text-3xl
                      sm:text-4xl
                      font-bold
                      text-slate-800
                    "
                  >
                    {project.name}
                  </h1>

                  <p className="text-slate-500 mt-2 max-w-2xl">
                    {project.description ||
                      "No project description available."}
                  </p>

                </div>

              </div>

              {/* Deadline */}

              <div
                className="
                  bg-slate-50
                  rounded-xl
                  p-4
                  min-w-[200px]
                "
              >

                <div className="flex items-center gap-2 text-slate-500">

                  <FaCalendarAlt />

                  <span>
                    Project Deadline
                  </span>

                </div>

                <p className="font-semibold text-slate-800 mt-2">

                  {project.deadline
                    ? new Date(
                        project.deadline
                      ).toLocaleDateString()
                    : "Not Set"}

                </p>

              </div>

            </div>

            {/* ============================
                Project Stats
            ============================ */}

            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-3
                gap-4
                mt-8
              "
            >

              <div className="bg-blue-50 rounded-xl p-5">

                <FaTasks className="text-blue-600 text-xl mb-3" />

                <p className="text-slate-500 text-sm">
                  Total Tasks
                </p>

                <p className="text-2xl font-bold text-slate-800">
                  {tasks.length}
                </p>

              </div>

              <div className="bg-green-50 rounded-xl p-5">

                <FaCheckCircle className="text-green-600 text-xl mb-3" />

                <p className="text-slate-500 text-sm">
                  Completed
                </p>

                <p className="text-2xl font-bold text-slate-800">
                  {completedTasks}
                </p>

              </div>

              <div className="bg-orange-50 rounded-xl p-5">

                <FaClock className="text-orange-600 text-xl mb-3" />

                <p className="text-slate-500 text-sm">
                  Pending
                </p>

                <p className="text-2xl font-bold text-slate-800">
                  {pendingTasks}
                </p>

              </div>

            </div>

            {/* Progress */}

            <div className="mt-8">

              <div className="flex justify-between mb-2">

                <span className="font-medium text-slate-600">
                  Project Progress
                </span>

                <span className="font-bold text-teal-600">
                  {progress}%
                </span>

              </div>

              <div
                className="
                  w-full
                  h-3
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

          </div>

          {/* ============================
              Project Members
          ============================ */}

          <div
            className="
              bg-white
              rounded-3xl
              shadow-sm
              border
              border-slate-200
              p-6
              sm:p-8
              mb-8
            "
          >

            <div className="flex items-center gap-3 mb-6">

              <FaUsers className="text-teal-600 text-2xl" />

              <div>

                <h2 className="text-2xl font-bold text-slate-800">
                  Project Members
                </h2>

                <p className="text-slate-500 text-sm">
                  Members working on this project
                </p>

              </div>

            </div>

            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3
                gap-4
              "
            >

              {project.members?.length === 0 ? (

                <p className="text-slate-500">
                  No members found.
                </p>

              ) : (

                project.members?.map(
                  (member) => (

                    <div
                      key={member._id}
                      className="
                        flex
                        items-center
                        gap-4
                        border
                        border-slate-200
                        rounded-xl
                        p-4
                      "
                    >

                      <div
                        className="
                          w-11
                          h-11
                          rounded-full
                          bg-teal-100
                          text-teal-600
                          flex
                          items-center
                          justify-center
                        "
                      >
                        <FaUser />
                      </div>

                      <div>

                        <p className="font-semibold text-slate-800">
                          {member.fullName}
                        </p>

                        <p className="text-sm text-slate-500">
                          {member.employeeId ||
                            member.email}
                        </p>

                      </div>

                    </div>

                  )
                )

              )}

            </div>

          </div>

          {/* ============================
              Project Tasks
          ============================ */}

          <div
            className="
              bg-white
              rounded-3xl
              shadow-sm
              border
              border-slate-200
              p-6
              sm:p-8
            "
          >

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

              <div>

                <h2 className="text-2xl font-bold text-slate-800">
                  Project Tasks
                </h2>

                <p className="text-slate-500 mt-1">
                  Tasks assigned in this project
                </p>

              </div>

              <select
                value={taskDateFilter}
                onChange={(e) =>
                  setTaskDateFilter(e.target.value)
                }
                className="
                  border
                  border-slate-300
                  rounded-xl
                  px-4
                  py-3
                  outline-none
                  focus:ring-2
                  focus:ring-teal-500
                  w-full
                  sm:w-52
                "
              >

                <option value="All">
                  All Tasks
                </option>

                <option value="Today">
                  Today
                </option>

                <option value="Yesterday">
                  Yesterday
                </option>

                <option value="Last 7 Days">
                  Last 7 Days
                </option>

                <option value="This Month">
                  This Month
                </option>

              </select>

            </div>

            {/* No Tasks */}

            {filteredProjectTasks.length === 0 ? (

              <div className="text-center py-12">

                <FaTasks
                  className="
                    text-5xl
                    text-slate-300
                    mx-auto
                    mb-4
                  "
                />

                <h3 className="text-xl font-bold text-slate-700">
                  No Tasks
                </h3>

                <p className="text-slate-500 mt-2">
                  No tasks are assigned in this project.
                </p>

              </div>

            ) : (

              <div className="overflow-x-auto">

                <table className="w-full min-w-[850px]">

                  <thead className="bg-slate-900 text-white">

                    <tr>

                      <th className="text-left px-5 py-4">
                        Task
                      </th>

                      <th className="text-left px-5 py-4">
                        Attachments
                      </th>

                      <th className="text-left px-5 py-4">
                        Assigned By
                      </th>

                      <th className="text-left px-5 py-4">
                        Priority
                      </th>

                      <th className="text-left px-5 py-4">
                        Deadline
                      </th>

                      <th className="text-left px-5 py-4">
                        Status
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {filteredProjectTasks.map((task) => (

                      <tr
                        key={task._id}
                        className="
                          border-b
                          border-slate-200
                          hover:bg-slate-50
                        "
                      >

                        {/* Task */}

                        <td className="px-5 py-5">

                          <p className="font-semibold text-slate-800">
                            {task.title}
                          </p>

                          <p className="text-sm text-slate-500 mt-1">
                            {task.description}
                          </p>

                        </td>

                        {/* Attachments */}

                        <td className="px-5 py-5">

                          {task.attachments &&
                          task.attachments.length > 0 ? (

                            <div className="flex flex-wrap gap-2">

                              {task.attachments.map(
                                (attachment, index) => {

                                  const imageUrl =
                                    typeof attachment === "string"
                                      ? attachment
                                      : attachment?.url;

                                  return (
                                    <button
                                      key={index}
                                      type="button"
                                      onClick={() =>
                                        setSelectedImage({
                                          url: imageUrl,
                                          name:
                                            attachment?.filename ||
                                            `Attachment ${index + 1}`,
                                        })
                                      }
                                      className="
                                        rounded-lg
                                        overflow-hidden
                                        border
                                        border-slate-200
                                        hover:ring-2
                                        hover:ring-teal-500
                                        transition
                                        focus:outline-none
                                      "
                                    >
                                      <img
                                        src={imageUrl}
                                        alt={`Attachment ${index + 1}`}
                                        className="
                                          w-16
                                          h-16
                                          object-cover
                                          rounded-lg
                                          cursor-pointer
                                        "
                                      />
                                    </button>
                                  );

                                }
                              )}

                            </div>

                          ) : (

                            <span className="text-sm text-slate-400">
                              No images
                            </span>

                          )}

                        </td>

                        {/* Assigned By */}

                        <td className="px-5 py-5">

                          <div className="flex items-center gap-2">

                            <FaUser className="text-blue-500" />

                            <span>
                              {task.createdBy?.fullName ||
                                "Admin"}
                            </span>

                          </div>

                        </td>

                        {/* Priority */}

                        <td className="px-5 py-5">

                          <span
                            className={`
                              px-3
                              py-1
                              rounded-full
                              text-sm
                              font-medium
                              ${getPriorityColor(
                                task.priority
                              )}
                            `}
                          >
                            {task.priority}
                          </span>

                        </td>

                        {/* Deadline */}

                        <td className="px-5 py-5">

                          {task.deadline
                            ? new Date(
                                task.deadline
                              ).toLocaleDateString()
                            : "No deadline"}

                        </td>

                        {/* Status */}

                        <td className="px-5 py-5">

                          <span
                            className={`
                              px-3
                              py-1
                              rounded-full
                              text-sm
                              font-medium
                              ${getStatusColor(
                                task.status
                              )}
                            `}
                          >
                            {task.status}
                          </span>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            )}

          </div>

          <EmployeeShareTask
            project={project}
            tasks={tasks}
          />

        </div>

      </main>

      {/* ================================= */}
      {/* IMAGE POPUP */}
      {/* ================================= */}

      {selectedImage && (
        <div
          className="
            fixed
            inset-0
            z-[99999]
            bg-black/80
            flex
            items-center
            justify-center
            p-4
          "
          onClick={() => setSelectedImage(null)}
        >

          <div
            className="
              relative
              bg-white
              rounded-2xl
              p-4
              shadow-2xl
              max-w-5xl
              w-full
              max-h-[90vh]
            "
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* Close button */}

            <button
              type="button"
              onClick={() =>
                setSelectedImage(null)
              }
              className="
                absolute
                top-3
                right-3
                z-20
                w-10
                h-10
                rounded-full
                bg-red-500
                hover:bg-red-600
                text-white
                flex
                items-center
                justify-center
              "
              aria-label="Close image"
            >
              <FaTimes />
            </button>

            {/* Image */}

            <div
              className="
                flex
                items-center
                justify-center
                bg-slate-100
                rounded-xl
                p-4
              "
            >

              <img
                src={selectedImage.url}
                alt={selectedImage.name}
                className="
                  max-w-full
                  max-h-[75vh]
                  object-contain
                  rounded-lg
                "
              />

            </div>

            {/* Filename */}

            <p className="text-center text-sm text-slate-600 mt-3">
              {selectedImage.name}
            </p>

          </div>

        </div>
      )}

    </div>
  );
}

export default EmployeeProjectDetails;