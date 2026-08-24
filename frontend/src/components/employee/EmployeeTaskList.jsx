import { useEffect, useRef, useState } from "react";
import {
  FaSearch,
  FaTasks,
} from "react-icons/fa";

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

  const tableContainerRef = useRef(null);

  // ================================
  // FILTER TASKS
  // ================================

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

    if (dateFilter !== "All") {
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

  // Reset horizontal scroll when filters change
  useEffect(() => {
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollLeft = 0;
    }
  }, [filteredTasks]);

  return (
    <section className="w-full">

      {/* ================================= */}
      {/* HEADER */}
      {/* ================================= */}

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-7 lg:p-8">

        {/* Title */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-7">

          <div>

            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">

                <FaTasks className="text-teal-600 text-xl" />

              </div>

              <div>

                <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
                  My Tasks
                </h2>

                <p className="text-slate-500 text-sm sm:text-base mt-1">
                  All tasks assigned to you
                </p>

              </div>

            </div>

          </div>

          {/* Task Count */}

          <div className="bg-slate-100 rounded-xl px-5 py-3 w-fit">

            <span className="text-2xl font-bold text-slate-800">
              {filteredTasks.length}
            </span>

            <span className="text-slate-500 ml-2">
              Task{filteredTasks.length !== 1 ? "s" : ""}
            </span>

          </div>

        </div>

        {/* ================================= */}
        {/* FILTERS */}
        {/* ================================= */}

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-7">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">

            {/* Search */}

            <div className="relative lg:col-span-1">

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
                  h-12
                  bg-white
                  border
                  border-slate-300
                  rounded-xl
                  pl-11
                  pr-4
                  text-sm
                  text-slate-700
                  placeholder:text-slate-400
                  focus:ring-2
                  focus:ring-teal-500
                  focus:border-teal-500
                  outline-none
                  transition
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
                h-12
                bg-white
                border
                border-slate-300
                rounded-xl
                px-4
                text-sm
                text-slate-700
                focus:ring-2
                focus:ring-teal-500
                focus:border-teal-500
                outline-none
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
                h-12
                bg-white
                border
                border-slate-300
                rounded-xl
                px-4
                text-sm
                text-slate-700
                focus:ring-2
                focus:ring-teal-500
                focus:border-teal-500
                outline-none
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
                h-12
                bg-white
                border
                border-slate-300
                rounded-xl
                px-4
                text-sm
                text-slate-700
                focus:ring-2
                focus:ring-teal-500
                focus:border-teal-500
                outline-none
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

          </div>

          {/* Date filter */}

          <div className="mt-3">

            <select
              value={dateFilter}
              onChange={(e) =>
                setDateFilter(e.target.value)
              }
              className="
                w-full
                sm:w-auto
                min-w-[180px]
                h-12
                bg-white
                border
                border-slate-300
                rounded-xl
                px-4
                text-sm
                text-slate-700
                focus:ring-2
                focus:ring-teal-500
                focus:border-teal-500
                outline-none
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

        {/* ================================= */}
        {/* TABLE */}
        {/* ================================= */}

        <div
          ref={tableContainerRef}
          className="w-full rounded-2xl border border-slate-200 overflow-x-auto"
        >

          <table className="w-full min-w-[1000px]">

            <thead className="bg-slate-900 text-white">

              <tr>

                <th className="w-[22%] px-4 py-4 text-left">
                  Task
                </th>

                <th className="w-[14%] px-4 py-4 text-left">
                  Attachments
                </th>

                <th className="w-[20%] px-4 py-4 text-left">
                  Assigned By
                </th>

                <th className="w-[12%] px-4 py-4 text-left">
                  Priority
                </th>

                <th className="w-[14%] px-4 py-4 text-left">
                  Deadline
                </th>

                <th className="w-[10%] px-4 py-4 text-left">
                  Status
                </th>

                <th className="w-[12%] px-4 py-4 text-center">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredTasks.length === 0 ? (

                <tr>

                  <td
                    colSpan="7"
                    className="text-center py-16 text-slate-500"
                  >

                    <FaTasks className="text-5xl text-slate-300 mx-auto mb-4" />

                    <h3 className="text-xl font-semibold text-slate-700">
                      No Tasks Found
                    </h3>

                    <p className="mt-2">
                      Try changing your filters.
                    </p>

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

    </section>
  );
}

export default EmployeeTaskList;