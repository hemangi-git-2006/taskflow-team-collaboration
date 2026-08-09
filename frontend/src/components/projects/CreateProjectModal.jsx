import { useState } from "react";
import API from "../../services/api";

function CreateProjectModal({ closeModal, refreshProjects }) {
  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    deadline: "",
    status: "Active",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await API.post("/projects", {
        ...formData,
        createdBy: user._id,
      });

      alert("Project Created Successfully");

      refreshProjects();

      closeModal();

    } catch (error) {
      alert(error.response?.data?.message || "Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-5 sm:p-6 lg:p-8">

        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-slate-800">
          Create New Project
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>

            <label className="block mb-2 font-medium text-slate-700">
              Project Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter project name"
              className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              required
            />

          </div>

          <div>

            <label className="block mb-2 font-medium text-slate-700">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Enter project description"
              className="w-full border border-slate-300 rounded-lg px-4 py-3 resize-none focus:ring-2 focus:ring-teal-500 focus:outline-none"
              required
            />

          </div>

          <div>

            <label className="block mb-2 font-medium text-slate-700">
              Deadline
            </label>

            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              required
            />

          </div>

          <div>

            <label className="block mb-2 font-medium text-slate-700">
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            >
              <option>Active</option>
              <option>Pending</option>
              <option>Completed</option>
            </select>

          </div>

          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4">

            <button
              type="button"
              onClick={closeModal}
              className="w-full sm:w-auto px-5 py-3 rounded-lg border border-slate-300 hover:bg-slate-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg transition"
            >
              {loading ? "Creating..." : "Create Project"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default CreateProjectModal;