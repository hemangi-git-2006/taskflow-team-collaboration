import { useState, useEffect } from "react";
import API from "../../services/api";

function AddMemberModal({
  closeModal,
  projectId,
  refreshMembers,
}) {
  const [mode, setMode] = useState("existing");

  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] =
    useState(null);

  const [formData, setFormData] = useState({
    employeeId: "",
    fullName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // ========================================
  // Fetch Existing Employees
  // ========================================
  useEffect(() => {
    const getEmployees = async () => {
      try {
        const res = await API.get("/members");

        setEmployees(res.data);
      } catch (error) {
        console.log(
          "GET EMPLOYEES ERROR:",
          error
        );
      }
    };

    getEmployees();
  }, []);

  // ========================================
  // Select Existing Employee
  // ========================================
  const handleEmployeeChange = (e) => {
    const employeeId = e.target.value;

    const employee = employees.find(
      (emp) =>
        emp.employeeId === employeeId
    );

    setSelectedEmployee(employee || null);
  };

  // ========================================
  // Handle New Member Inputs
  // ========================================
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ========================================
  // Submit
  // ========================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // ====================================
      // CREATE NEW MEMBER
      // ====================================
      if (mode === "new") {
        if (
          !formData.employeeId ||
          !formData.fullName ||
          !formData.email ||
          !formData.password
        ) {
          alert("Please fill all fields");
          return;
        }

        // Create new member
        const response = await API.post(
          "/members/create",
          {
            employeeId:
              formData.employeeId.trim(),

            fullName:
              formData.fullName.trim(),

            email:
              formData.email.trim(),

            password:
              formData.password,
          }
        );

        const newMember =
          response.data.member;

        // ====================================
        // Add newly created member
        // to current project
        // ====================================
        await API.post("/members", {
          employeeId:
            newMember.employeeId,

          projectId,
        });

        alert(
          "Member created and added successfully"
        );
      }

      // ====================================
      // ADD EXISTING MEMBER
      // ====================================
      else {
        if (!selectedEmployee) {
          alert("Please select an employee");
          return;
        }

        await API.post("/members", {
          employeeId:
            selectedEmployee.employeeId,

          projectId,
        });

        alert(
          "Member Added To Project Successfully"
        );
      }

      refreshMembers();
      closeModal();

    } catch (error) {
      console.log(
        "MEMBER ERROR:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Failed to process member"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-5 sm:p-6 lg:p-8">

        {/* ================================= */}
        {/* Header */}
        {/* ================================= */}

        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-slate-800">
          Add Member
        </h2>

        {/* ================================= */}
        {/* Mode Buttons */}
        {/* ================================= */}

        <div className="flex gap-2 mb-6">

          <button
            type="button"
            onClick={() => {
              setMode("existing");
              setSelectedEmployee(null);
            }}
            className={`flex-1 py-3 rounded-lg font-semibold transition ${
              mode === "existing"
                ? "bg-teal-600 text-white"
                : "bg-slate-100 text-slate-700"
            }`}
          >
            Existing Member
          </button>

          <button
            type="button"
            onClick={() => {
              setMode("new");
              setSelectedEmployee(null);
              setFormData({
                employeeId: "",
                fullName: "",
                email: "",
                password: "",
              });
            }}
            className={`flex-1 py-3 rounded-lg font-semibold transition ${
              mode === "new"
                ? "bg-teal-600 text-white"
                : "bg-slate-100 text-slate-700"
            }`}
          >
            Create New Member
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* ================================= */}
          {/* EXISTING MEMBER */}
          {/* ================================= */}

          {mode === "existing" && (
            <>
              {/* Select Employee */}
              <div>

                <label className="block mb-2 font-medium text-slate-700">
                  Select Employee
                </label>

                <select
                  value={
                    selectedEmployee?.employeeId ||
                    ""
                  }
                  onChange={handleEmployeeChange}
                  required
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                >

                  <option value="">
                    Select an employee
                  </option>

                  {employees.map(
                    (employee) => (
                      <option
                        key={employee._id}
                        value={employee.employeeId}
                      >
                        {employee.fullName} -{" "}
                        {employee.employeeId}
                      </option>
                    )
                  )}

                </select>
              </div>

              {/* Employee ID */}
              <div>

                <label className="block mb-2 font-medium text-slate-700">
                  Employee ID
                </label>

                <input
                  type="text"
                  value={
                    selectedEmployee?.employeeId ||
                    ""
                  }
                  readOnly
                  placeholder="Employee ID"
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
                  value={
                    selectedEmployee?.fullName ||
                    ""
                  }
                  readOnly
                  placeholder="Full Name"
                  className="w-full bg-slate-100 border border-slate-300 rounded-lg px-4 py-3 text-slate-600 cursor-not-allowed"
                />

              </div>

              {/* Email */}
              <div>

                <label className="block mb-2 font-medium text-slate-700">
                  Email
                </label>

                <input
                  type="email"
                  value={
                    selectedEmployee?.email ||
                    ""
                  }
                  readOnly
                  placeholder="Email Address"
                  className="w-full bg-slate-100 border border-slate-300 rounded-lg px-4 py-3 text-slate-600 cursor-not-allowed"
                />

              </div>
            </>
          )}

          {/* ================================= */}
          {/* CREATE NEW MEMBER */}
          {/* ================================= */}

          {mode === "new" && (
            <>
              {/* Employee ID */}
              <div>

                <label className="block mb-2 font-medium text-slate-700">
                  Employee ID
                </label>

                <input
                  type="text"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleInputChange}
                  placeholder="EMP001"
                  required
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none"
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
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  required
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none"
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
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email Address"
                  required
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none"
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
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter Password"
                  required
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />

              </div>
            </>
          )}

          {/* ================================= */}
          {/* Buttons */}
          {/* ================================= */}

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
              disabled={
                loading ||
                (mode === "existing" &&
                  !selectedEmployee)
              }
              className="w-full sm:w-auto bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? "Processing..."
                : mode === "new"
                ? "Create & Add Member"
                : "Add Member"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default AddMemberModal;