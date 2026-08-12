import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaUser,
  FaEnvelope,
  FaIdBadge,
} from "react-icons/fa";

import API from "../services/api";

function EmployeeMemberProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMember();
  }, [id]);

  const fetchMember = async () => {
    try {
      const res = await API.get(`/members/user/${id}`);

      // API returns array, so find selected member
      const selectedMember = res.data.find(
        (item) => item._id === id
      );

      setMember(selectedMember);

    } catch (error) {
      console.log("Member profile error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <p className="text-slate-500">
          Loading member...
        </p>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100">

        <h2 className="text-2xl font-bold text-slate-700">
          Member Not Found
        </h2>

        <button
          onClick={() => navigate(-1)}
          className="mt-5 bg-teal-600 text-white px-5 py-3 rounded-xl"
        >
          Go Back
        </button>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-5 sm:p-8">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="
          flex
          items-center
          gap-2
          text-slate-600
          hover:text-teal-600
          mb-6
        "
      >
        <FaArrowLeft />
        Back
      </button>

      {/* Profile Card */}
      <div className="max-w-3xl mx-auto">

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 sm:p-10">

          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">

            <div className="
              w-24
              h-24
              rounded-full
              bg-teal-600
              text-white
              flex
              items-center
              justify-center
              text-4xl
              font-bold
            ">
              {member.fullName
                ?.charAt(0)
                ?.toUpperCase()}
            </div>

            <div className="text-center sm:text-left">

              <h1 className="text-3xl font-bold text-slate-800">
                {member.fullName}
              </h1>

              <p className="text-slate-500 mt-1">
                Project Member
              </p>

            </div>

          </div>

          {/* Details */}
          <div className="mt-8 space-y-4">

            <div className="
              flex
              items-center
              gap-4
              bg-slate-50
              rounded-xl
              p-4
            ">
              <FaIdBadge className="text-teal-600" />

              <div>
                <p className="text-xs text-slate-400">
                  Employee ID
                </p>

                <p className="font-semibold text-slate-700">
                  {member.employeeId || "Not available"}
                </p>
              </div>

            </div>

            <div className="
              flex
              items-center
              gap-4
              bg-slate-50
              rounded-xl
              p-4
            ">
              <FaEnvelope className="text-teal-600" />

              <div>
                <p className="text-xs text-slate-400">
                  Email
                </p>

                <p className="font-semibold text-slate-700 break-all">
                  {member.email || "Not available"}
                </p>
              </div>

            </div>

            <div className="
              flex
              items-center
              gap-4
              bg-slate-50
              rounded-xl
              p-4
            ">
              <FaUser className="text-teal-600" />

              <div>
                <p className="text-xs text-slate-400">
                  Role
                </p>

                <p className="font-semibold text-slate-700">
                  {member.role || "Member"}
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default EmployeeMemberProfile;