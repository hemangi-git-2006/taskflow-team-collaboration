import { useEffect, useState } from "react";
import API from "../services/api";

function TeamMembers() {
  const [members, setMembers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMembersAndProjects();
  }, []);

  const getMembersAndProjects = async () => {
    try {
      const [memberRes, projectRes] = await Promise.all([
        API.get("/members"),
        API.get("/projects"),
      ]);

      console.log("Members:", memberRes.data);
      console.log("Projects:", projectRes.data);

      setMembers(memberRes.data);
      setProjects(projectRes.data);
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  /*
    Find project for a member.

    This assumes your member contains projectId.
    Example:
    member.projectId = "abc123"
  */
  const getMemberProjects = (member) => {
    return projects.filter(
      (project) =>
        project._id === member.projectId ||
        project.members?.some(
          (projectMember) =>
            projectMember._id === member._id ||
            projectMember === member._id
        )
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 p-8 flex justify-center items-center">
        <h2 className="text-xl font-semibold text-slate-500">
          Loading Members...
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
          Team Members
        </h1>

        <p className="text-slate-500 mt-2">
          View all team members and the projects they are working on.
        </p>
      </div>

      {/* Members */}
      {members.length === 0 ? (
        <div className="bg-white rounded-2xl shadow p-10 text-center">
          <h2 className="text-xl font-semibold text-slate-700">
            No Team Members Found
          </h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {members.map((member) => {
            const memberProjects = getMemberProjects(member);

            return (
              <div
                key={member._id}
                className="bg-white rounded-2xl shadow-md border border-slate-200 p-6"
              >

                {/* Member */}
                <div className="flex items-center gap-4 mb-5">

                  <div className="w-14 h-14 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-xl font-bold">
                    {member.fullName?.charAt(0)?.toUpperCase() || "M"}
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-slate-800">
                      {member.fullName || member.name}
                    </h2>

                    <p className="text-sm text-slate-500">
                      {member.email}
                    </p>
                  </div>

                </div>

                {/* Member ID */}
                <div className="mb-4">
                  <p className="text-xs font-semibold text-slate-400 uppercase">
                    Member ID
                  </p>

                  <p className="text-sm text-slate-700 break-all mt-1">
                    {member._id}
                  </p>
                </div>

                {/* Projects */}
                <div>
                  <p className="text-sm font-semibold text-slate-500 mb-3">
                    Projects
                  </p>

                  {memberProjects.length === 0 ? (
                    <p className="text-sm text-slate-400">
                      No project assigned
                    </p>
                  ) : (
                    <div className="space-y-3">

                      {memberProjects.map((project) => (
                        <div
                          key={project._id}
                          className="bg-slate-50 border border-slate-200 rounded-xl p-3"
                        >

                          <p className="font-semibold text-slate-800">
                            {project.name}
                          </p>

                          <p className="text-xs text-slate-400 mt-1 break-all">
                            Project ID: {project._id}
                          </p>

                        </div>
                      ))}

                    </div>
                  )}
                </div>

              </div>
            );
          })}

        </div>
      )}

    </div>
  );
}

export default TeamMembers; 