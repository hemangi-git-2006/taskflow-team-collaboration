import { useState } from "react";
import API from "../../services/api";
import EditMemberModal from "./EditMemberModal";

function MembersTable({
  members,
  refreshMembers,
}) {

  const [selectedMember, setSelectedMember] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);

  const deleteMember = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this member?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/members/${id}`);

      refreshMembers();
    } catch (error) {
      console.log(error);
    }
  };

  return (

    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

      {/* Responsive Table */}

      <div className="overflow-x-auto">

        <table className="min-w-[850px] w-full">

          <thead className="bg-slate-900 text-white">

            <tr>

              <th className="text-left px-6 py-4">
                Employee ID
              </th>

              <th className="text-left px-6 py-4">
                Name
              </th>

              <th className="text-left px-6 py-4">
                Email
              </th>

              <th className="text-left px-6 py-4">
                Role
              </th>

              <th className="text-left px-6 py-4">
                Status
              </th>

              <th className="text-center px-6 py-4">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {members.map((member) => (

              <tr
                key={member._id}
                className="border-b hover:bg-slate-50 transition"
              >

                <td className="px-6 py-5 font-semibold whitespace-nowrap">
                  {member.employeeId}
                </td>

                <td className="px-6 py-5 whitespace-nowrap">
                  {member.fullName}
                </td>

                <td className="px-6 py-5 text-slate-600">
                  {member.email}
                </td>

                <td className="px-6 py-5">

                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">

                    {member.role}

                  </span>

                </td>

                <td className="px-6 py-5">

                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">

                    Active

                  </span>

                </td>

                <td className="px-6 py-5">

                  <div className="flex justify-center gap-2">

                    <button
                      onClick={() => {
                        setSelectedMember(member);
                        setOpenEditModal(true);
                      }}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg transition"
                    >
                      ✏️
                    </button>

                    <button
                      onClick={() => deleteMember(member._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition"
                    >
                      🗑️
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {openEditModal && (
        <EditMemberModal
          member={selectedMember}
          closeModal={() => setOpenEditModal(false)}
          refreshMembers={refreshMembers}
        />
      )}

    </div>

  );
}

export default MembersTable;