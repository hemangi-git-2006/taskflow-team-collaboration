import MembersTable from "../members/MembersTable";

function MembersTab({
  members,
  setOpenMemberModal,
  refreshMembers,
}) {
  return (
    <div>

      {/* Header */}

      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-5 mb-6 lg:mb-8">

        <div>

          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800">
            Employee Management
          </h2>

          <p className="text-sm sm:text-base text-slate-500 mt-2">
            Manage all project members
          </p>

        </div>

        <button
          onClick={() => setOpenMemberModal(true)}
          className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white px-5 sm:px-6 py-3 rounded-xl shadow-lg transition-all duration-300"
        >
          + Add Member
        </button>

      </div>

      {/* Table */}

      {members.length === 0 ? (

        <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 lg:p-16 text-center">

          <h2 className="text-2xl sm:text-3xl font-bold">
            No Members Yet
          </h2>

          <p className="text-sm sm:text-base text-slate-500 mt-3">
            Click "Add Member" to invite your first member.
          </p>

        </div>

      ) : (

        <MembersTable
          members={members}
          refreshMembers={refreshMembers}
        />

      )}

    </div>
  );
}

export default MembersTab;