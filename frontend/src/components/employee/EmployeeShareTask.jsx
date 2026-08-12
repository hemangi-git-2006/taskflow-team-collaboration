import { useState } from "react";
import API from "../../services/api";

import {
  FaUsers,
  FaTasks,
  FaPaperPlane,
  FaExclamationCircle,
} from "react-icons/fa";

function EmployeeShareTask({ project, tasks = [] }) {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [formData, setFormData] = useState({
    taskId: "",
    employeeId: "",
    reason: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const user = JSON.parse(
      localStorage.getItem("user")
    );

    const response = await API.post("/tasks/share", {
      taskId: formData.taskId,
      fromMember: user._id,
      toMember: formData.employeeId,
      reason: formData.reason,
      projectId: project._id,
    });

    alert(
      response.data.message ||
      "Task Shared Successfully"
    );

    // Reset form
    setFormData({
      taskId: "",
      employeeId: "",
      reason: "",
    });

  } catch (error) {
    console.log(
      "Share Task Error:",
      error
    );

    alert(
      error.response?.data?.message ||
      "Failed to share task"
    );
  }
};

  // Current employee ko list se remove karo
  const teamMembers =
    project?.members?.filter(
      (member) => member._id !== user?._id
    ) || [];

  return (
    <div className="mt-8">

      {/* Header */}
      <div className="mb-6">

        <div className="flex items-center gap-3">

          <div
            className="
              w-12 h-12
              rounded-xl
              bg-teal-100
              text-teal-600
              flex items-center
              justify-center
            "
          >
            <FaPaperPlane />
          </div>

          <div>

            <h2 className="text-2xl font-bold text-slate-800">
              Share Task With Team Member
            </h2>

            <p className="text-slate-500 mt-1">
              Share a task with another member of this project.
            </p>

          </div>

        </div>

      </div>

      {/* Form */}
      <div
        className="
          bg-white
          rounded-3xl
          border border-slate-200
          shadow-sm
          p-6 sm:p-8
        "
      >

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* Select Task */}
          <div>

            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Choose Task
            </label>

            <div className="relative">

              <FaTasks
                className="
                  absolute left-4 top-4
                  text-slate-400
                "
              />

              <select
                name="taskId"
                value={formData.taskId}
                onChange={handleChange}
                required
                className="
                  w-full
                  border border-slate-300
                  rounded-xl
                  pl-11 pr-4 py-3
                  outline-none
                  focus:ring-2
                  focus:ring-teal-500
                "
              >

                <option value="">
                  Select a task
                </option>

                {tasks.map((task) => (
                  <option
                    key={task._id}
                    value={task._id}
                  >
                    {task.title}
                  </option>
                ))}

              </select>

            </div>

          </div>

          {/* Select Member */}
          <div>

            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Choose Team Member
            </label>

            <div className="relative">

              <FaUsers
                className="
                  absolute left-4 top-4
                  text-slate-400
                "
              />

              <select
                name="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
                required
                className="
                  w-full
                  border border-slate-300
                  rounded-xl
                  pl-11 pr-4 py-3
                  outline-none
                  focus:ring-2
                  focus:ring-teal-500
                "
              >

                <option value="">
                  Select team member
                </option>

                {teamMembers.map((member) => (
                  <option
                    key={member._id}
                    value={member._id}
                  >
                    {member.fullName}
                    {member.employeeId
                      ? ` (${member.employeeId})`
                      : ""}
                  </option>
                ))}

              </select>

            </div>

            {teamMembers.length === 0 && (
              <p className="text-sm text-orange-600 mt-2">
                No other team members are available.
              </p>
            )}

          </div>

          {/* Reason */}
          <div>

            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Why are you sharing this task?
            </label>

            <div className="relative">

              <FaExclamationCircle
                className="
                  absolute left-4 top-4
                  text-slate-400
                "
              />

              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                required
                rows="5"
                placeholder="Example: I am having difficulty completing the backend API and need help."
                className="
                  w-full
                  border border-slate-300
                  rounded-xl
                  pl-11 pr-4 py-3
                  outline-none
                  resize-none
                  focus:ring-2
                  focus:ring-teal-500
                "
              />

            </div>

            <p className="text-xs text-slate-400 mt-2">
              Explain the difficulty you are facing with this task.
            </p>

          </div>

          {/* Submit */}
          <div className="flex justify-end">

            <button
              type="submit"
              disabled={teamMembers.length === 0}
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                bg-teal-600
                hover:bg-teal-700
                disabled:bg-slate-300
                disabled:cursor-not-allowed
                text-white
                px-6 py-3
                rounded-xl
                font-semibold
                transition
              "
            >

              <FaPaperPlane />

              Share Task

            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EmployeeShareTask;