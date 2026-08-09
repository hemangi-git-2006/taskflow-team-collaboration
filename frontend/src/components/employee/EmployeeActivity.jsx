import {
  FaCheckCircle,
  FaClock,
  FaTasks,
  FaFolderOpen,
  FaCalendarAlt,
} from "react-icons/fa";

function EmployeeActivity({ tasks = [] }) {

  // Sort latest tasks first
  const sortedTasks = [...tasks].sort(
    (a, b) =>
      new Date(b.updatedAt || b.createdAt || 0) -
      new Date(a.updatedAt || a.createdAt || 0)
  );

  const getStatusIcon = (status) => {

    switch (status) {

      case "Completed":
        return (
          <div className="w-11 h-11 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
            <FaCheckCircle />
          </div>
        );

      case "In Progress":
        return (
          <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
            <FaClock />
          </div>
        );

      default:
        return (
          <div className="w-11 h-11 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
            <FaTasks />
          </div>
        );
    }
  };

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

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-5 sm:p-6">

      {/* Header */}

      <div className="mb-6">

        <h2 className="text-2xl font-bold text-slate-800">
          Recent Activity
        </h2>

        <p className="text-slate-500 mt-1">
          Recent updates from your tasks
        </p>

      </div>

      {/* Empty State */}

      {sortedTasks.length === 0 ? (

        <div className="text-center py-12">

          <FaTasks className="mx-auto text-5xl text-slate-300 mb-4" />

          <h3 className="text-xl font-semibold text-slate-700">
            No Activity Yet
          </h3>

          <p className="text-slate-500 mt-2">
            Your task activity will appear here.
          </p>

        </div>

      ) : (

        <div className="space-y-5">

          {sortedTasks.slice(0, 8).map((task) => (

            <div
              key={task._id}
              className="flex gap-4 border-b border-slate-100 pb-5 last:border-b-0 last:pb-0"
            >

              {/* Icon */}

              {getStatusIcon(task.status)}

              {/* Content */}

              <div className="flex-1 min-w-0">

                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">

                  <div>

                    <h3 className="font-bold text-slate-800">
                      {task.title}
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
                      {task.status === "Completed"
                        ? "Task completed"
                        : task.status === "In Progress"
                        ? "Task is in progress"
                        : "Task is pending"}
                    </p>

                  </div>

                  <span
                    className={`self-start px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      task.status
                    )}`}
                  >
                    {task.status || "Todo"}
                  </span>

                </div>

                {/* Project */}

                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-3 text-sm text-slate-500">

                  <div className="flex items-center gap-2">

                    <FaFolderOpen className="text-teal-600" />

                    <span>
                      {task.project?.name || "No Project"}
                    </span>

                  </div>

                  {/* Deadline */}

                  {task.deadline && (

                    <div className="flex items-center gap-2">

                      <FaCalendarAlt className="text-red-500" />

                      <span>
                        {new Date(
                          task.deadline
                        ).toLocaleDateString()}
                      </span>

                    </div>

                  )}

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default EmployeeActivity;