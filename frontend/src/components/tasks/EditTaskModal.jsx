import { useState, useEffect } from "react";
import API from "../../services/api";

function EditTaskModal({
  task,
  closeModal,
  refreshTasks,
}) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "Todo",
    deadline: "",
  });

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status,
        deadline: task.deadline?.substring(0, 10),
      });
    }
  }, [task]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const updateTask = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/tasks/${task._id}`, form);

      refreshTasks();

      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">

      <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl p-5 sm:p-6 lg:p-8">

        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-6">
          Edit Task
        </h2>

        <form
          onSubmit={updateTask}
          className="space-y-5"
        >

          {/* Task Title */}

          <div>

            <label className="block mb-2 font-medium text-slate-700">
              Task Title
            </label>

            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter Task Title"
              className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              required
            />

          </div>

          {/* Description */}

          <div>

            <label className="block mb-2 font-medium text-slate-700">
              Description
            </label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              placeholder="Enter Description"
              className="w-full border border-slate-300 rounded-xl px-4 py-3 resize-none focus:ring-2 focus:ring-teal-500 focus:outline-none"
              required
            />

          </div>

          {/* Priority */}

          <div>

            <label className="block mb-2 font-medium text-slate-700">
              Priority
            </label>

            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

          </div>

          {/* Status */}

          <div>

            <label className="block mb-2 font-medium text-slate-700">
              Status
            </label>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            >
              <option>Todo</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>

          </div>

          {/* Deadline */}

          <div>

            <label className="block mb-2 font-medium text-slate-700">
              Deadline
            </label>

            <input
              type="date"
              name="deadline"
              value={form.deadline}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />

          </div>

          {/* Buttons */}

          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-3">

            <button
              type="button"
              onClick={closeModal}
              className="w-full sm:w-auto border border-slate-300 px-5 py-3 rounded-xl hover:bg-slate-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl transition"
            >
              Update Task
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EditTaskModal;