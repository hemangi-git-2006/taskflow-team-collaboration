import { useState, useEffect } from "react";
import API from "../../services/api";

function AddMemberModal({
  closeModal,
  projectId,
  refreshMembers,
}) {
  const [formData, setFormData] = useState({
    employeeId: "",
    fullName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // Fetch next Employee ID
  useEffect(() => {
    const getEmployeeId = async () => {
      try {
        const res = await API.get("/members/next-id");

        setFormData((prev) => ({
          ...prev,
          employeeId: res.data.employeeId,
        }));
      } catch (error) {
        console.log(error);
      }
    };

    getEmployeeId();
  }, []);

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

      await API.post("/members", {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        projectId,
      });

      alert("Member Added Successfully");

      refreshMembers();

      closeModal();

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Failed to add member"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-5 sm:p-6 lg:p-8">

        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-slate-800">
          Add Member
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Employee ID */}

          <div>

            <label className="block mb-2 font-medium text-slate-700">
              Employee ID
            </label>

            <input
              type="text"
              value={formData.employeeId}
              readOnly
              className="w-full bg-slate-100 border border-slate-300 rounded-lg px-4 py-3 text-slate-600 cursor-not-allowed"
            />

          </div>

          {/* Full Name */}

          <div>

            <label className="block mb-2 font-medium text-slate-700">
              Full Name
            </label>

            <input
              type="text"
              name="fullName"
              placeholder="Enter Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              required
            />

          </div>

          {/* Email */}

          <div>

            <label className="block mb-2 font-medium text-slate-700">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              required
            />

          </div>

          {/* Password */}

          <div>

            <label className="block mb-2 font-medium text-slate-700">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              required
            />

          </div>

          {/* Buttons */}

          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-3">

            <button
              type="button"
              onClick={closeModal}
              className="w-full sm:w-auto border border-slate-300 px-5 py-3 rounded-lg hover:bg-slate-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition"
            >
              {loading ? "Adding..." : "Add Member"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddMemberModal;