import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import EmployeeSidebar from "../components/employee/EmployeeSidebar";
import { FaUsers, FaEnvelope, FaIdBadge } from "react-icons/fa";

function EmployeeTeamPage() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  // ============================
  // Get Team Members
  // ============================
  const getMembers = async () => {
    try {
      setLoading(true);

      const res = await API.get(
        `/members/user/${user._id}`
      );

      console.log(
        "TEAM MEMBERS FROM API:",
        res.data
      );

      setMembers(res.data);
    } catch (error) {
      console.log(
        "GET MEMBERS ERROR:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?._id) {
      getMembers();
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-100">

      {/* ================================= */}
      {/* Employee Sidebar */}
      {/* ================================= */}

      <EmployeeSidebar />

      {/* ================================= */}
      {/* Main Content */}
      {/* ================================= */}

      <main
        className="
          lg:ml-64
          min-h-screen
          pt-16
          lg:pt-0
        "
      >

        <div className="p-4 sm:p-6 lg:p-8">

          {/* ================================= */}
          {/* Header */}
          {/* ================================= */}

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

              <div>

                <div className="flex items-center gap-3">

                  <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center">
                    <FaUsers className="text-teal-600 text-xl" />
                  </div>

                  <div>

                    <h1 className="text-3xl font-bold text-slate-800">
                      Team Members
                    </h1>

                    <p className="text-slate-500 mt-1">
                      Members working with you across your projects
                    </p>

                  </div>

                </div>

              </div>

              <div className="bg-teal-50 text-teal-700 px-5 py-3 rounded-xl font-semibold">
                {members.length}{" "}
                {members.length === 1
                  ? "Member"
                  : "Members"}
              </div>

            </div>

          </div>

          {/* ================================= */}
          {/* Members Table */}
          {/* ================================= */}

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

            {/* Loading */}
            {loading ? (

              <div className="p-10 text-center text-slate-500">
                Loading team members...
              </div>

            ) : members.length === 0 ? (

              <div className="p-10 text-center">

                <FaUsers className="mx-auto text-4xl text-slate-300 mb-4" />

                <h2 className="text-lg font-semibold text-slate-700">
                  No team members yet
                </h2>

                <p className="text-slate-500 mt-1">
                  You are not currently working with any other members.
                </p>

              </div>

            ) : (

              <>

                {/* =============================== */}
                {/* Desktop Table */}
                {/* =============================== */}

                <div className="hidden md:block overflow-x-auto">

                  <table className="w-full">

                    <thead>

                      <tr className="bg-slate-50 border-b border-slate-200">

                        <th className="text-left px-6 py-4 font-semibold text-slate-700">
                          Name
                        </th>

                        <th className="text-left px-6 py-4 font-semibold text-slate-700">
                          Employee ID
                        </th>

                        <th className="text-left px-6 py-4 font-semibold text-slate-700">
                          Email
                        </th>

                        <th className="text-left px-6 py-4 font-semibold text-slate-700">
                          Project
                        </th>

                        <th className="text-right px-6 py-4 font-semibold text-slate-700">
                          Action
                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      {members.map(
                        (member) => (

                          <tr
                            key={member._id}
                            className="
                              border-b
                              border-slate-100
                              last:border-b-0
                              hover:bg-slate-50
                              transition
                            "
                          >

                            {/* Name */}

                            <td className="px-6 py-4">

                              <div className="flex items-center gap-3">

                                <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold">

                                  {member.fullName
                                    ?.charAt(0)
                                    ?.toUpperCase()}

                                </div>

                                <div>

                                  <p className="font-semibold text-slate-800">
                                    {member.fullName}
                                  </p>

                                  <p className="text-xs text-slate-400">
                                    Project Member
                                  </p>

                                </div>

                              </div>

                            </td>

                            {/* Employee ID */}

                            <td className="px-6 py-4">

                              <div className="flex items-center gap-2 text-slate-700">

                                <FaIdBadge className="text-teal-600" />

                                <span className="font-medium">
                                  {member.employeeId ||
                                    "N/A"}
                                </span>

                              </div>

                            </td>

                            {/* Email */}

                            <td className="px-6 py-4">

                              <div className="flex items-center gap-2 text-slate-600">

                                <FaEnvelope className="text-teal-600" />

                                <span>
                                  {member.email}
                                </span>

                              </div>

                            </td>

                            {/* Project */}

                            <td className="px-6 py-4">

                              {member.projects &&
                              member.projects.length > 0 ? (

                                <div className="flex flex-wrap gap-2">

                                  {member.projects.map(
                                    (project) => (

                                      <span
                                        key={
                                          project._id
                                        }
                                        className="
                                          inline-flex
                                          px-3
                                          py-1
                                          rounded-full
                                          text-xs
                                          font-medium
                                          bg-teal-50
                                          text-teal-700
                                        "
                                      >
                                        {
                                          project.name
                                        }
                                      </span>

                                    )
                                  )}

                                </div>

                              ) : (

                                <span className="text-slate-400">
                                  Project Member
                                </span>

                              )}

                            </td>

                            {/* Action */}

                            <td className="px-6 py-4 text-right">

                              <button
                                onClick={() =>
                                  navigate(
                                    `/member/${member._id}`
                                  )
                                }
                                className="
                                  text-teal-600
                                  hover:text-teal-700
                                  font-semibold
                                  transition
                                "
                              >
                                View Profile →
                              </button>

                            </td>

                          </tr>

                        )
                      )}

                    </tbody>

                  </table>

                </div>


                {/* =============================== */}
                {/* Mobile List */}
                {/* =============================== */}

                <div className="md:hidden divide-y divide-slate-100">

                  {members.map(
                    (member) => (

                      <div
                        key={member._id}
                        className="p-5"
                      >

                        <div className="flex items-start justify-between gap-4">

                          <div className="flex items-center gap-3">

                            <div className="w-11 h-11 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold">

                              {member.fullName
                                ?.charAt(0)
                                ?.toUpperCase()}

                            </div>

                            <div>

                              <h3 className="font-semibold text-slate-800">
                                {member.fullName}
                              </h3>

                              <p className="text-xs text-slate-400">
                                Project Member
                              </p>

                            </div>

                          </div>

                          <button
                            onClick={() =>
                              navigate(
                                `/member/${member._id}`
                              )
                            }
                            className="text-teal-600 font-semibold text-sm"
                          >
                            View →
                          </button>

                        </div>

                        <div className="mt-4 space-y-2">

                          <div className="flex items-center gap-2 text-sm text-slate-600">

                            <FaIdBadge className="text-teal-600" />

                            <span>
                              {member.employeeId ||
                                "N/A"}
                            </span>

                          </div>

                          <div className="flex items-center gap-2 text-sm text-slate-600">

                            <FaEnvelope className="text-teal-600" />

                            <span className="break-all">
                              {member.email}
                            </span>

                          </div>

                        </div>

                        {/* Projects */}

                        {member.projects &&
                          member.projects.length > 0 && (

                            <div className="mt-4 flex flex-wrap gap-2">

                              {member.projects.map(
                                (project) => (

                                  <span
                                    key={
                                      project._id
                                    }
                                    className="
                                      px-3
                                      py-1
                                      rounded-full
                                      text-xs
                                      font-medium
                                      bg-teal-50
                                      text-teal-700
                                    "
                                  >
                                    {
                                      project.name
                                    }
                                  </span>

                                )
                              )}

                            </div>

                          )}

                      </div>

                    )
                  )}

                </div>

              </>

            )}

          </div>

        </div>

      </main>

    </div>
  );
}

export default EmployeeTeamPage;