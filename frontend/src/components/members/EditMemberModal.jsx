import { useEffect, useState } from "react";
import API from "../../services/api";

function EditMemberModal({
  member,
  closeModal,
  refreshMembers,
}) {
  const [form, setForm] = useState({
    employeeId: "",
    fullName: "",
    email: "",
  });

  useEffect(() => {
    if (member) {
      setForm({
        employeeId: member.employeeId,
        fullName: member.fullName,
        email: member.email,
      });
    }
  }, [member]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const updateMember = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/members/${member._id}`, {
        fullName: form.fullName,
        email: form.email,
      });

      refreshMembers();

      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-5 sm:p-6 lg:p-8">

        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-slate-800">
          Edit Member Details
        </h2>

        <form
          onSubmit={updateMember}
          className="space-y-5"
        >

          {/* Employee ID */}

     {/* Employee ID */}

<div>
  <label className="block mb-2 font-medium text-slate-700">
    Employee ID
  </label>

  <input
    type="text"
    value={formData.employeeId || ""}
    readOnly
    disabled
    tabIndex={-1}
    autoComplete="off"
    placeholder="Generating..."
    className="w-full bg-slate-100 border border-slate-300 rounded-lg px-4 py-3 text-slate-500 cursor-not-allowed"
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
              value={form.fullName}
              onChange={handleChange}
              placeholder="Enter Full Name"
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
              value={form.email}
              onChange={handleChange}
              placeholder="Enter Email"
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
              className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg transition"
            >
              Update Member
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EditMemberModal;