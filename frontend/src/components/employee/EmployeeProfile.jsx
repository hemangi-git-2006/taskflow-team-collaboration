import {
  FaUserCircle,
  FaEnvelope,
  FaIdBadge,
  FaUserTag,
  FaFolderOpen,
} from "react-icons/fa";

function EmployeeProfile({ user, totalProjects = 0 }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">

      <div className="flex flex-col md:flex-row items-center gap-8">

        {/* Profile Image */}

        <div className="flex justify-center">

          <FaUserCircle className="text-[170px] text-teal-600" />

        </div>

        {/* Details */}

        <div className="flex-1">

          <h2 className="text-4xl font-bold text-slate-800">
            {user?.fullName}
          </h2>

          <p className="text-slate-500 mt-2">
            Team Member
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-8">

            <div className="flex items-center gap-3">

              <FaEnvelope className="text-blue-500 text-xl" />

              <div>

                <p className="text-slate-500 text-sm">
                  Email
                </p>

                <h3 className="font-semibold">
                  {user?.email}
                </h3>

              </div>

            </div>

            <div className="flex items-center gap-3">

              <FaIdBadge className="text-green-500 text-xl" />

              <div>

                <p className="text-slate-500 text-sm">
                  Employee ID
                </p>

                <h3 className="font-semibold">
                  {user?.employeeId}
                </h3>

              </div>

            </div>

            <div className="flex items-center gap-3">

              <FaUserTag className="text-purple-500 text-xl" />

              <div>

                <p className="text-slate-500 text-sm">
                  Role
                </p>

                <h3 className="font-semibold">
                  {user?.role}
                </h3>

              </div>

            </div>

            <div className="flex items-center gap-3">

              <FaFolderOpen className="text-orange-500 text-xl" />

              <div>

                <p className="text-slate-500 text-sm">
                  Projects
                </p>

                <h3 className="font-semibold">
                  {totalProjects}
                </h3>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default EmployeeProfile;