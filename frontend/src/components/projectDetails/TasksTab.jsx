import { useState } from "react";
import API from "../../services/api";
import EditTaskModal from "../tasks/EditTaskModal";

function TasksTab({
  tasks,
  setOpenTaskModal,
  refreshTasks,
})  {
  const [selectedTask, setSelectedTask] = useState(null);
const [openEditModal, setOpenEditModal] = useState(false);
  console.log("TasksTab Render:", tasks);

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
const deleteTask = async (id) => {
  const confirmDelete = window.confirm(
    "Delete this task?"
  );

  if (!confirmDelete) return;

  try {
    await API.delete(`/tasks/${id}`);

    refreshTasks();
  } catch (error) {
    console.log(error);
  }
};
  return (
    <div>

      {/* Header */}

      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-5 mb-6 lg:mb-8">

        <div>

          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800">
            Task Management
          </h2>

          <p className="text-sm sm:text-base text-slate-500 mt-2">
            Manage project tasks
          </p>

        </div>

        <button
          onClick={() => setOpenTaskModal(true)}
         className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white px-5 sm:px-6 py-3 rounded-xl shadow-lg transition-all duration-300"
        >
          + Create Task
        </button>

      </div>

      {/* Empty State */}

      {tasks.length === 0 ? (

        <div claclassName="bg-white rounded-2xl shadow-lg p-8 sm:p-12 lg:p-16 text-center">

          <h2 className="text-2xl sm:text-3xl font-bold">
            No Tasks Yet
          </h2>

          <p className="text-sm sm:text-base text-slate-500 mt-3">
            Create your first task.
          </p>

        </div>

      ) : (

       <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

         <div className="overflow-x-auto">

<table className="min-w-[950px] w-full">

            <thead className="bg-slate-900 text-white">

              <tr>

                <th className="text-left px-6 py-4">
                  Task
                </th>

                <th className="text-left px-6 py-4">
                  Assigned To
                </th>

                <th className="text-left px-6 py-4">
                  Priority
                </th>

                <th className="text-left px-6 py-4">
                  Status
                </th>

                <th className="text-left px-6 py-4">
                  Deadline
                </th>

                <th className="text-center px-6 py-4">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>
{tasks.map((task) => {
  console.log("Task:", task);

  return (
    <tr
      key={task._id}
      className="border-b hover:bg-slate-50"
    >
      <td className="px-6 py-5">
        <h3 className="font-semibold text-sm sm:text-base">
          {task.title || "N/A"}
        </h3>

        <p className="text-xs sm:text-sm text-slate-500">
          {task.description || "No Description"}
        </p>
      </td>

      <td className="px-6 py-5 whitespace-nowrap">
        {task.assignedTo?.fullName || "N/A"}
      </td>

      <td className="px-6 py-5">
        <span
          className={`px-3 py-1 rounded-full text-sm ${priorityColor(task.priority)}`}
        >
          {task.priority || "N/A"}
        </span>
      </td>

      <td className="px-6 py-5">
        <span
          className={`px-3 py-1 rounded-full text-sm ${statusColor(task.status)}`}
        >
          {task.status || "N/A"}
        </span>
      </td>

      <td className="px-6 py-5 whitespace-nowrap">
        {task.deadline
          ? new Date(task.deadline).toLocaleDateString()
          : "N/A"}
      </td>

      <td className="px-6 py-5">
        <div className="flex justify-center gap-2">
         <button
  onClick={() => {
    setSelectedTask(task);
    setOpenEditModal(true);
  }}
className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg transition"
>
  ✏️
</button>

         <button
  onClick={() => deleteTask(task._id)}
 className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition"
>
  🗑️
</button>
        </div>
      </td>
    </tr>
  );
})}

            </tbody>

          </table>
</div>
        </div>

      )}

      {/* Edit Task Modal */}

   {openEditModal && selectedTask && (
  <EditTaskModal
    task={selectedTask}
    closeModal={() => setOpenEditModal(false)}
    refreshTasks={refreshTasks}
  />
)}

    </div>
  );
}

export default TasksTab;