function MemberCard({ member }) {
  return (
    <div className="bg-white rounded-xl shadow p-5 border hover:shadow-lg transition">

      <div className="flex justify-between">

        <div>

          <h2 className="text-xl font-bold">
            {member.fullName}
          </h2>

          <p className="text-gray-500">
            {member.email}
          </p>

          <p className="text-sm mt-2">
            Employee ID :
            <span className="font-semibold ml-2">
              {member.employeeId}
            </span>
          </p>

        </div>

        <div>

          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
            {member.role}
          </span>

        </div>

      </div>

    </div>
  );
}

export default MemberCard;