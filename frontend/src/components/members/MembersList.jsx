import MemberCard from "./MemberCard";

function MembersList({ members }) {

  if (members.length === 0) {

    return (
      <div className="text-center py-16">

        <h2 className="text-2xl font-bold">
          No Members
        </h2>

        <p className="text-gray-500 mt-3">
          Add your first member.
        </p>

      </div>
    );

  }

  return (

    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

      {members.map((member) => (

        <MemberCard
          key={member._id}
          member={member}
        />

      ))}

    </div>

  );

}

export default MembersList;