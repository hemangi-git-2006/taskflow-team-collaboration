import API from "../../services/api";
import {
  FaCalendarAlt,
  FaFolderOpen,
  FaUserTie,
} from "react-icons/fa";

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

    <tr className="border-b hover:bg-slate-50 transition">

      {/* Task */}

      <td className="px-6 py-5">

        <h3 className="font-semibold text-slate-800">
          {task.title}
        </h3>

        <p className="text-sm text-slate-500">
          {task.project?.name}
        </p>

      </td>

      {/* Assigned By */}

      <td className="px-6 py-5">

        <div className="flex items-center gap-2">

          <FaUserTie className="text-blue-500" />

          {task.createdBy?.fullName}

        </div>

      </td>

      {/* Priority */}

      <td className="px-6 py-5">

        <span
          className={`px-3 py-1 rounded-full text-sm ${priorityColor(
            task.priority
          )}`}
        >
          {task.priority}
        </span>

      </td>

      {/* Due Date */}

      <td className="px-6 py-5">

        <div className="flex items-center gap-2">

          <FaCalendarAlt className="text-red-500" />

          {new Date(task.deadline).toLocaleDateString()}

        </div>

      </td>

      {/* Status */}

      <td className="px-6 py-5">

        <span
          className={`px-3 py-1 rounded-full text-sm ${statusColor(
            task.status
          )}`}
        >
          {task.status}
        </span>

      </td>

      {/* Action */}

      <td className="px-6 py-5">

        <select
          value={task.status}
          onChange={(e) =>
            updateStatus(e.target.value)
          }
          className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500"
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