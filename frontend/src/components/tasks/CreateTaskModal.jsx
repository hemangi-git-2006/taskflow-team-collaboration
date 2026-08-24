  import { useEffect, useState } from "react";
  import API from "../../services/api";
  

  function CreateTaskModal({
    closeModal,
    refreshProject,
    projectId,
  }) {
    const [members, setMembers] = useState([]);

    // NEW: Store selected images
    const [files, setFiles] = useState([]);

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

    // NEW: Handle image selection
    const handleFileChange = (e) => {
      const selectedFiles = Array.from(e.target.files);

      setFiles((previousFiles) => [
        ...previousFiles,
        ...selectedFiles,
      ]);

      // Clear input so same image can be selected again
      e.target.value = "";
    };

    // NEW: Remove selected image
    const removeFile = (index) => {
      setFiles((previousFiles) =>
        previousFiles.filter((_, fileIndex) => fileIndex !== index)
      );
    };

    const createTask = async (e) => {
      e.preventDefault();

      try {
        const admin = JSON.parse(localStorage.getItem("user"));

        // NEW: Create FormData
        const data = new FormData();

        data.append("title", formData.title);
        data.append("description", formData.description);
        data.append("project", projectId);
        data.append("assignedTo", formData.assignedTo);
        data.append("createdBy", admin._id);
        data.append("priority", formData.priority);
        data.append("status", formData.status);
        data.append("deadline", formData.deadline);

        // NEW: Add images
        files.forEach((file) => {
          data.append("attachments", file);
        });

        await API.post("/tasks", data);

        refreshProject();
        closeModal();

      } catch (err) {
  console.log("CREATE TASK ERROR:", err);

  alert(
    err.response?.data?.error ||
    err.response?.data?.message ||
    "Unable to create task"
  );
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

            {/* ============================ */}
            {/* NEW: Upload Images */}
            {/* ============================ */}

            <div>

              <label className="block mb-2 font-medium text-slate-700">
                Upload Images / Screenshots
              </label>

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />

              <p className="text-sm text-slate-500 mt-2">
                You can upload multiple images. Maximum 5 MB per image.
              </p>

            </div>

            {/* ============================ */}
            {/* NEW: Image Preview */}
            {/* ============================ */}

            {files.length > 0 && (

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">

                {files.map((file, index) => (

                  <div
                    key={`${file.name}-${index}`}
                    className="relative border border-slate-200 rounded-xl overflow-hidden bg-slate-50"
                  >

                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="w-full h-32 object-cover"
                    />

                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white w-7 h-7 rounded-full flex items-center justify-center font-bold"
                    >
                      ×
                    </button>

                    <p className="text-xs text-slate-600 p-2 truncate">
                      {file.name}
                    </p>

                  </div>

                ))}

              </div>

            )}

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