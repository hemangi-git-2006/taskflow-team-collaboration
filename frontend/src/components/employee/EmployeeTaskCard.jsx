import API from "../../services/api";

import {
  FaCalendarAlt,
  FaUserTie,
} from "react-icons/fa";

import TaskAttachments from "../common/TaskAttachments";

function EmployeeTaskCard({
  task,
  refreshTasks,
}) {

  const updateStatus = async (status) => {
    try {
      await API.put(`/tasks/${task._id}/status`, {
        status,
      });

      refreshTasks();

    } catch (error) {
      console.log(error);
    }
  };

  const priorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-700";

      case "Medium":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-green-100 text-green-700";
    }
  };

  const statusColor = (status) => {
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
    <tr className="border-b border-slate-200 hover:bg-slate-50 transition">

      {/* ========================= */}
      {/* Task */}
      {/* ========================= */}

      <td className="w-[20%] px-2 sm:px-4 py-5 align-middle">

        <h3 className="font-semibold text-slate-800 text-xs sm:text-sm break-words">
          {task.title}
        </h3>

        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          {task.description}
        </p>

      </td>


      {/* ========================= */}
      {/* Attachments */}
      {/* ========================= */}

      <td className="w-[14%] px-2 sm:px-4 py-5 align-middle">

        <TaskAttachments
  taskId={task._id}
  attachments={task.attachments}
/>

      </td>


      {/* ========================= */}
      {/* Assigned By */}
      {/* ========================= */}

      <td className="w-[20%] px-2 sm:px-4 py-5 align-middle">

        <div className="flex items-center gap-1 sm:gap-2">

          <FaUserTie className="text-blue-500 shrink-0 text-xs sm:text-sm" />

          <span className="text-xs sm:text-sm text-slate-700 break-words">
            {task.createdBy?.fullName || "Unknown"}
          </span>

        </div>

      </td>


      {/* ========================= */}
      {/* Priority */}
      {/* ========================= */}

      <td className="w-[11%] px-2 sm:px-4 py-5 align-middle">

        <span
          className={`
            inline-block
            px-2 sm:px-3
            py-1
            rounded-full
            text-xs sm:text-sm
            whitespace-nowrap
            ${priorityColor(task.priority)}
          `}
        >
          {task.priority}
        </span>

      </td>


      {/* ========================= */}
      {/* Due Date */}
      {/* ========================= */}

      <td className="w-[14%] px-2 sm:px-4 py-5 align-middle">

        <div className="flex items-center gap-1 sm:gap-2">

          <FaCalendarAlt className="text-red-500 shrink-0 text-xs sm:text-sm" />

          <span className="text-xs sm:text-sm text-slate-700 whitespace-nowrap">
            {new Date(task.deadline).toLocaleDateString()}
          </span>

        </div>

      </td>


      {/* ========================= */}
      {/* Status */}
      {/* ========================= */}

      <td className="w-[9%] px-2 sm:px-4 py-5 align-middle">

        <span
          className={`
            inline-block
            px-2 sm:px-3
            py-1
            rounded-full
            text-xs sm:text-sm
            whitespace-nowrap
            ${statusColor(task.status)}
          `}
        >
          {task.status}
        </span>

      </td>


      {/* ========================= */}
      {/* Action */}
      {/* ========================= */}

      <td className="w-[12%] px-2 sm:px-4 py-5 align-middle text-center">

        <select
          value={task.status}
          onChange={(e) =>
            updateStatus(e.target.value)
          }
          className="
            w-full
            max-w-[120px]
            border
            border-slate-300
            rounded-lg
            px-2 sm:px-3
            py-2
            text-xs sm:text-sm
            focus:ring-2
            focus:ring-teal-500
            outline-none
          "
        >

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

      </td>

    </tr>
  );
}

export default EmployeeTaskCard;