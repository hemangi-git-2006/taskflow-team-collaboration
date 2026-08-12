import { useNavigate } from "react-router-dom";

import {
  FaUsers,
  FaEnvelope,
  FaIdBadge,
  FaChevronRight,
} from "react-icons/fa";

function EmployeeTeam({ members = [] }) {
  const navigate = useNavigate();

  const handleMemberClick = (memberId) => {
    console.log("Clicked Member ID:", memberId);

    if (!memberId) {
      console.log("Member ID is missing");
      return;
    }

    navigate(`/member/${memberId}`);
  };

  return (
    <section className="bg-white rounded-3xl shadow-sm border border-slate-200 p-5 sm:p-6 mt-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">

        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 flex items-center gap-3">
            <FaUsers className="text-teal-600" />
            Team Members
          </h2>

          <p className="text-slate-500 mt-2">
            Members working with you across your projects
          </p>
        </div>

        {/* Member Count */}
        <div className="bg-teal-50 text-teal-700 px-4 py-2 rounded-xl font-semibold w-fit">
          {members.length} Member
          {members.length !== 1 ? "s" : ""}
        </div>

      </div>

      {/* No Members */}
      {members.length === 0 ? (

        <div className="border border-dashed border-slate-300 rounded-2xl p-10 text-center">

          <FaUsers className="text-5xl text-slate-300 mx-auto mb-4" />

          <h3 className="text-xl font-semibold text-slate-700">
            No Team Members
          </h3>

          <p className="text-slate-500 mt-2">
            No team members found in your projects.
          </p>

        </div>

      ) : (

        /* Members Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

          {members.map((member) => (

            <div
              key={member._id}
              onClick={() =>
                handleMemberClick(member._id)
              }
              role="button"
              tabIndex={0}
              className="
                border
                border-slate-200
                rounded-2xl
                p-5
                bg-slate-50
                hover:bg-white
                hover:shadow-lg
                hover:border-teal-200
                transition
                cursor-pointer
                group
              "
            >

              {/* Profile */}
              <div className="flex items-center gap-4">

                <div
                  className="
                    w-14
                    h-14
                    rounded-full
                    bg-teal-600
                    text-white
                    flex
                    items-center
                    justify-center
                    text-xl
                    font-bold
                    shrink-0
                  "
                >
                  {member.fullName
                    ?.charAt(0)
                    ?.toUpperCase() || "U"}
                </div>

                <div className="min-w-0 flex-1">

                  <h3
                    className="
                      font-bold
                      text-slate-800
                      text-lg
                      truncate
                      group-hover:text-teal-600
                      transition
                    "
                  >
                    {member.fullName ||
                      "Unknown Member"}
                  </h3>

                  <p className="text-sm text-slate-500">
                    Project Member
                  </p>

                </div>

                {/* Arrow */}
                <FaChevronRight
                  className="
                    text-slate-300
                    group-hover:text-teal-600
                    group-hover:translate-x-1
                    transition
                    shrink-0
                  "
                />

              </div>

              {/* Details */}
              <div className="mt-5 space-y-3">

                {/* Employee ID */}
                <div className="flex items-center gap-3 text-slate-600">

                  <FaIdBadge className="text-teal-600 shrink-0" />

                  <span className="text-sm">
                    {member.employeeId ||
                      "No Employee ID"}
                  </span>

                </div>

                {/* Email */}
                <div className="flex items-center gap-3 text-slate-600">

                  <FaEnvelope className="text-teal-600 shrink-0" />

                  <span className="text-sm truncate">
                    {member.email ||
                      "No Email"}
                  </span>

                </div>

              </div>

              {/* View Profile */}
              <div
                className="
                  mt-5
                  pt-4
                  border-t
                  border-slate-200
                  text-sm
                  font-semibold
                  text-teal-600
                  flex
                  items-center
                  justify-between
                "
              >

                <span>
                  View Profile
                </span>

                <FaChevronRight
                  className="
                    text-xs
                    group-hover:translate-x-1
                    transition
                  "
                />

              </div>

            </div>

          ))}

        </div>

      )}

    </section>
  );
}

export default EmployeeTeam;