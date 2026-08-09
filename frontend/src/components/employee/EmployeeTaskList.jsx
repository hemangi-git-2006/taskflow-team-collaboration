import { useState } from "react";
import { FaSearch, FaTasks } from "react-icons/fa";
import EmployeeTaskCard from "./EmployeeTaskCard";

function EmployeeTaskList({
  tasks = [],
  projects = [],
  refreshTasks,
}) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");
  const [projectFilter, setProjectFilter] = useState("All");

  // ============================
  // Filter Tasks
  // ============================

  const filteredTasks = tasks.filter((task) => {

    // Search
    const matchSearch =
      task.title
        ?.toLowerCase()
        .includes(search.toLowerCase());

    // Status
    const matchStatus =
      statusFilter === "All"
        ? true
        : task.status === statusFilter;

    // Priority
    const matchPriority =
      priorityFilter === "All"
        ? true
        : task.priority === priorityFilter;

    // Project
    const matchProject =
      projectFilter === "All"
        ? true
        : task.project?._id === projectFilter;

    // Date
    let matchDate = true;

    if (dateFilter !== "All" && task.deadline) {

      const today = new Date();

      today.setHours(0, 0, 0, 0);

      const taskDate = new Date(task.deadline);

      taskDate.setHours(0, 0, 0, 0);

      switch (dateFilter) {

        case "Today":

          matchDate =
            taskDate.getTime() ===
            today.getTime();

          break;

        case "Yesterday": {

          const yesterday = new Date(today);

          yesterday.setDate(
            today.getDate() - 1
          );

          matchDate =
            taskDate.getTime() ===
            yesterday.getTime();

          break;
        }

        case "Last 7 Days": {

          const last7 = new Date(today);

          last7.setDate(
            today.getDate() - 7
          );

          matchDate =
            taskDate >= last7 &&
            taskDate <= today;

          break;
        }

        case "This Month":

          matchDate =
            taskDate.getMonth() ===
              today.getMonth() &&
            taskDate.getFullYear() ===
              today.getFullYear();

          break;

        default:

          matchDate = true;

      }
    }

    return (
      matchSearch &&
      matchStatus &&
      matchPriority &&
      matchDate &&
      matchProject
    );
  });

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-5 sm:p-6">

      {/* ============================
          Header
      ============================ */}

      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6 mb-8">

        {/* Title */}

        <div className="shrink-0">

          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 flex items-center gap-3">

            <FaTasks className="text-teal-600" />

            <span>
              My Tasks
            </span>

          </h2>

          <p className="text-slate-500 mt-2">
            {filteredTasks.length} Task(s) Found
          </p>

        </div>

        {/* ============================
            Filters
        ============================ */}

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-5
            gap-3
            w-full
            xl:w-auto
          "
        >

          {/* Search */}

          <div className="relative w-full">

            <FaSearch
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />

            <input
              type="text"
              placeholder="Search task..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="
                w-full
                border
                border-slate-300
                rounded-xl
                pl-11
                pr-4
                py-3
                focus:ring-2
                focus:ring-teal-500
                focus:border-teal-500
                outline-none
              "
            />

          </div>

          {/* Status */}

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="
              w-full
              border
              border-slate-300
              rounded-xl
              px-4
              py-3
              focus:ring-2
              focus:ring-teal-500
              focus:border-teal-500
              outline-none
              bg-white
            "
          >

            <option value="All">
              All Status
            </option>

            <option value="Todo">
              Todo
            </option>

            <option value="In Progress">
              In Progress
            </option>

            <option value="Completed">
              Completed
            </option>

          </select>

          {/* Priority */}

          <select
            value={priorityFilter}
            onChange={(e) =>
              setPriorityFilter(e.target.value)
            }
            className="
              w-full
              border
              border-slate-300
              rounded-xl
              px-4
              py-3
              focus:ring-2
              focus:ring-teal-500
              focus:border-teal-500
              outline-none
              bg-white
            "
          >

            <option value="All">
              All Priority
            </option>

            <option value="High">
              High
            </option>

            <option value="Medium">
              Medium
            </option>

            <option value="Low">
              Low
            </option>

          </select>

          {/* Project */}

          <select
            value={projectFilter}
            onChange={(e) =>
              setProjectFilter(e.target.value)
            }
            className="
              w-full
              border
              border-slate-300
              rounded-xl
              px-4
              py-3
              focus:ring-2
              focus:ring-teal-500
              focus:border-teal-500
              outline-none
              bg-white
            "
          >

            <option value="All">
              All Projects
            </option>

            {projects.map((project) => (

              <option
                key={project._id}
                value={project._id}
              >
                {project.name}
              </option>

            ))}

          </select>

          {/* Date */}

          <select
            value={dateFilter}
            onChange={(e) =>
              setDateFilter(e.target.value)
            }
            className="
              w-full
              border
              border-slate-300
              rounded-xl
              px-4
              py-3
              focus:ring-2
              focus:ring-teal-500
              focus:border-teal-500
              outline-none
              bg-white
            "
          >

            <option value="All">
              All Time
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

      </div>

      {/* ============================
          Task Table
      ============================ */}

      <div
        className="
          w-full
          overflow-x-auto
          rounded-2xl
          border
          border-slate-200
          bg-white
        "
      >

        <table
          className="
            min-w-[1000px]
            w-full
            border-collapse
          "
        >

          {/* Table Header */}

          <thead className="bg-slate-900 text-white">

            <tr>

              <th className="text-left px-5 py-4 whitespace-nowrap">
                Task
              </th>

              <th className="text-left px-5 py-4 whitespace-nowrap">
                Project
              </th>

              <th className="text-left px-5 py-4 whitespace-nowrap">
                Assigned By
              </th>

              <th className="text-left px-5 py-4 whitespace-nowrap">
                Priority
              </th>

              <th className="text-left px-5 py-4 whitespace-nowrap">
                Deadline
              </th>

              <th className="text-left px-5 py-4 whitespace-nowrap">
                Status
              </th>

              <th className="text-center px-5 py-4 whitespace-nowrap">
                Action
              </th>

            </tr>

          </thead>

          {/* Table Body */}

          <tbody>

            {filteredTasks.length === 0 ? (

              <tr>

                <td
                  colSpan="7"
                  className="text-center py-16 text-slate-500"
                >

                  <div className="flex flex-col items-center">

                    <FaTasks
                      className="
                        text-5xl
                        sm:text-6xl
                        text-slate-300
                        mb-4
                      "
                    />

                    <h2 className="text-xl sm:text-2xl font-bold">
                      No Tasks Found
                    </h2>

                    <p className="mt-2">
                      Try changing your filters.
                    </p>

                  </div>

                </td>

              </tr>

            ) : (

              filteredTasks.map((task) => (

                <EmployeeTaskCard
                  key={task._id}
                  task={task}
                  refreshTasks={refreshTasks}
                />

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default EmployeeTaskList;