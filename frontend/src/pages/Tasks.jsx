import { useEffect, useState } from "react";
import API from "../services/api";

function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

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
    <div className="min-h-screen bg-slate-100 p-8">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-5xl font-bold">
            Task Management
          </h1>

          <p className="text-slate-500 mt-2 text-lg">
            Manage all assigned tasks
          </p>

        </div>

        <div className="flex gap-4">

          <button
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-4 rounded-xl shadow-lg"
          >
            + Create Task
          </button>

          <div className="bg-blue-600 text-white rounded-xl px-6 py-4 font-semibold shadow">

            Total Tasks : {tasks.length}

          </div>

        </div>

      </div>

      {/* Search */}

      <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">

        <div className="grid grid-cols-12 gap-4">

          <input
            type="text"
            placeholder="🔍 Search task..."
            className="col-span-7 border rounded-xl px-5 py-4 outline-none"
          />

          <select className="col-span-2 border rounded-xl px-4">

            <option>All Status</option>

            <option>Todo</option>

            <option>In Progress</option>

            <option>Completed</option>

          </select>

          <select className="col-span-2 border rounded-xl px-4">

            <option>This Month</option>

            <option>This Week</option>

            <option>Today</option>

          </select>

          <button className="bg-slate-900 text-white rounded-xl">

            Filter

          </button>

        </div>

      </div>

      {/* Table */}

      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-900 text-white">

            <tr>

              <th className="text-left px-6 py-5">Task</th>

              <th className="text-left px-6 py-5">Assigned By</th>

              <th className="text-left px-6 py-5">Assigned To</th>

              <th className="text-left px-6 py-5">Priority</th>

              <th className="text-left px-6 py-5">Status</th>

              <th className="text-left px-6 py-5">Due Date</th>

              <th className="text-left px-6 py-5">Created</th>

              <th className="text-center px-6 py-5">Actions</th>

            </tr>

          </thead>

          <tbody>

            {tasks.length === 0 ? (

              <tr>

                <td
                  colSpan="8"
                  className="text-center py-24 text-2xl text-slate-500"
                >

                  📋

                  <p className="mt-4">

                    No Tasks Found

                  </p>

                </td>

              </tr>

            ) : (

              tasks.map((task) => (

                <tr
                  key={task._id}
                  className="border-b hover:bg-slate-50"
                >

                  <td className="px-6 py-5 font-semibold">

                    {task.title}

                  </td>

                  <td className="px-6 py-5">

                    {task.createdBy?.fullName}

                  </td>

                  <td className="px-6 py-5">

                    {task.assignedTo?.fullName}

                  </td>

                  <td className="px-6 py-5">

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${getPriorityColor(task.priority)}`}
                    >

                      {task.priority}

                    </span>

                  </td>

                  <td className="px-6 py-5">

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${getStatusColor(task.status)}`}
                    >

                      {task.status}

                    </span>

                  </td>

                  <td className="px-6 py-5">

                    {new Date(task.deadline).toLocaleDateString()}

                  </td>

                  <td className="px-6 py-5">

                    {new Date(task.createdAt).toLocaleDateString()}

                  </td>

                  <td className="px-6 py-5">

                    <div className="flex justify-center gap-3">

                      <button className="bg-yellow-500 hover:bg-yellow-600 text-white w-10 h-10 rounded-lg">

                        ✏️

                      </button>

                      <button className="bg-red-500 hover:bg-red-600 text-white w-10 h-10 rounded-lg">

                        🗑️

                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Tasks;