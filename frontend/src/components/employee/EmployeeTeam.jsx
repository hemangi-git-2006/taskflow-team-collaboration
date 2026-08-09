import {
  FaUsers,
  FaUserCircle,
  FaEnvelope,
} from "react-icons/fa";

function EmployeeTeam({ members = [] }) {

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-5 sm:p-6">

      {/* Header */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">

        <div>

          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
            <FaUsers className="text-teal-600" />
            Team Members
          </h2>

          <p className="text-slate-500 mt-1">
            Members working on this project
          </p>

        </div>

        <div className="bg-teal-100 text-teal-700 px-4 py-2 rounded-xl font-semibold">

          {members.length} Member
          {members.length !== 1 ? "s" : ""}

        </div>

      </div>

      {/* Empty State */}

      {members.length === 0 ? (

        <div className="py-12 text-center">

          <FaUsers className="mx-auto text-5xl text-slate-300 mb-4" />

          <h3 className="text-xl font-semibold text-slate-700">
            No Team Members Found
          </h3>

          <p className="text-slate-500 mt-2">
            Select a project to view its team members.
          </p>

        </div>

      ) : (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

          {members.map((member) => (

            <div
              key={member._id}
              className="border border-slate-200 rounded-2xl p-5 hover:shadow-md hover:border-teal-300 transition duration-300"
            >

              {/* Member */}

              <div className="flex items-center gap-4">

                <div className="w-14 h-14 rounded-full bg-teal-100 flex items-center justify-center text-teal-600">

                  {member.profileImage ? (

                    <img
                      src={member.profileImage}
                      alt={member.fullName}
                      className="w-14 h-14 rounded-full object-cover"
                    />

                  ) : (

                    <FaUserCircle size={42} />

                  )}

                </div>

                <div className="min-w-0">

                  <h3 className="font-bold text-slate-800 truncate">
                    {member.fullName}
                  </h3>

                  <p className="text-sm text-teal-600 font-medium">
                    {member.role || "Member"}
                  </p>

                </div>

              </div>

              {/* Employee ID */}

              <div className="mt-5 bg-slate-50 rounded-xl p-3">

                <p className="text-xs text-slate-500">
                  Employee ID
                </p>

                <p className="font-semibold text-slate-700 mt-1">
                  {member.employeeId || "N/A"}
                </p>

              </div>

              {/* Email */}

              <div className="flex items-center gap-2 mt-4 text-sm text-slate-500">

                <FaEnvelope className="text-teal-600 shrink-0" />

                <span className="truncate">
                  {member.email || "No email"}
                </span>

              </div>

              {/* Status */}

              <div className="mt-4">

                <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">

                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>

                  Active

                </span>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default EmployeeTeam;