import { useState, useEffect } from "react";
import API from "../../services/api";

function AddMemberModal({
  closeModal,
  projectId,
  refreshMembers,
}) {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] =
    useState(null);

  const [loading, setLoading] = useState(false);

  // Fetch Existing Employees
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

  // Select Employee
  const handleEmployeeChange = (e) => {
    const employeeId = e.target.value;

    const employee = employees.find(
      (emp) =>
        emp.employeeId === employeeId
    );

    setSelectedEmployee(employee || null);
  };

  // Add Existing Employee To Project
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedEmployee) {
      alert("Please select an employee");
      return;
    }

    try {
      setLoading(true);

      await API.post("/members", {
        employeeId:
          selectedEmployee.employeeId,

        projectId,
      });

      alert(
        "Member Added To Project Successfully"
      );

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
              className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              required
            >

              <option value="">
                Select an employee
              </option>

              {employees.map((employee) => (

                <option
                  key={employee._id}
                  value={employee.employeeId}
                >
                  {employee.fullName} -{" "}
                  {employee.employeeId}
                </option>

              ))}

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
                selectedEmployee?.email || ""
              }
              readOnly
              placeholder="Email Address"
              className="w-full bg-slate-100 border border-slate-300 rounded-lg px-4 py-3 text-slate-600 cursor-not-allowed"
            />

          </div>

          {/* Selected Employee Information */}

          {selectedEmployee && (

            <div className="bg-teal-50 border border-teal-200 rounded-xl p-4">

              <p className="text-sm text-teal-700">
                You are adding:
              </p>

              <p className="font-bold text-slate-800 mt-1">
                {selectedEmployee.fullName}
              </p>

              <p className="text-sm text-slate-600 mt-1">
                Employee ID:{" "}
                {selectedEmployee.employeeId}
              </p>

            </div>

          )}

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
              disabled={
                loading || !selectedEmployee
              }
              className="w-full sm:w-auto bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? "Adding..."
                : "Add Member"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddMemberModal;