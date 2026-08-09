import { useEffect, useState } from "react";
import API from "../../services/api";

function CreateTaskModal({
  closeModal,
  refreshProject,
  projectId,
}) {
  const [members, setMembers] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedTo: "",
    priority: "Medium",
    status: "Todo",
    deadline: "",
  });

  useEffect(() => {
    getMembers();
  }, []);

  const getMembers = async () => {
    try {
      const res = await API.get(`/members/${projectId}`);
      setMembers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const createTask = async (e) => {
    e.preventDefault();

    try {
      const admin = JSON.parse(localStorage.getItem("user"));

      await API.post("/tasks", {
        ...formData,
        project: projectId,
        createdBy: admin._id,
      });

      refreshProject();
      closeModal();

    } catch (err) {
      console.log(err);
      alert("Unable to create task");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">

      <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl p-5 sm:p-6 lg:p-8">

        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-6">
          Create Task
        </h2>

        <form
          onSubmit={createTask}
          className="space-y-5"
        >

          {/* Task Title */}

          <div>

            <label className="block mb-2 font-medium text-slate-700">
              Task Title
            </label>

            <input
              name="title"
              placeholder="Enter Task Title"
              onChange={handleChange}
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
              placeholder="Enter Task Description"
              rows="4"
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-xl px-4 py-3 resize-none focus:ring-2 focus:ring-teal-500 focus:outline-none"
              required
            />

          </div>

          {/* Assign Member */}

          <div>

            <label className="block mb-2 font-medium text-slate-700">
              Assign Member
            </label>

            <select
              name="assignedTo"
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              required
            >
              <option value="">
                Select Member
              </option>

              {members.map((member) => (
                <option
                  key={member._id}
                  value={member._id}
                >
                  {member.fullName} ({member.employeeId})
                </option>
              ))}

            </select>

          </div>

          {/* Priority */}

          <div>

            <label className="block mb-2 font-medium text-slate-700">
              Priority
            </label>

            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
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
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              required
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
              Create Task
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default CreateTaskModal;