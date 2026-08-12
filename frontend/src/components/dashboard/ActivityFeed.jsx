import {
  FaCheckSquare,
  FaFolderPlus,
  FaUserPlus,
} from "react-icons/fa";

function ActivityFeed({
  projects = [],
  members = [],
  tasks = [],
}) {
  // Create activity list
  const activities = [
    ...projects.map((project) => ({
      type: "Project",
      title: "Project Created",
      name: project.name,
      date: project.createdAt,
    })),

    ...members.map((member) => ({
      type: "Member",
      title: "Member Added",
      name: member.fullName,
      date: member.createdAt,
    })),

    ...tasks.map((task) => ({
      type: "Task",
      title: "Task Created",
      name: task.title,
      date: task.createdAt,
    })),
  ]
    .filter((activity) => activity.date)
    .sort(
      (a, b) =>
        new Date(b.date) - new Date(a.date)
    )
    .slice(0, 5);

  // Format date
  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Activity icon
  const getActivityIcon = (type) => {
    if (type === "Task") {
      return (
        <FaCheckSquare className="text-green-600" />
      );
    }

    if (type === "Project") {
      return (
        <FaFolderPlus className="text-blue-600" />
      );
    }

    if (type === "Member") {
      return (
        <FaUserPlus className="text-purple-600" />
      );
    }

    return null;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 lg:p-8">

      {/* Header */}
      <h2 className="text-xl sm:text-2xl font-bold mb-5">
        Recent Activity
      </h2>

      {/* No Activity */}
      {activities.length === 0 ? (

        <div className="border-l-4 border-teal-500 pl-4">

          <h3 className="font-semibold text-base sm:text-lg">
            No Activity Yet
          </h3>

          <p className="text-slate-500 text-sm sm:text-base mt-2">
            Your latest project updates will appear here.
          </p>

        </div>

      ) : (

        /* Scrollable Activity List */
        <div className="max-h-[320px] overflow-y-auto pr-2 space-y-5">

          {activities.map((activity, index) => (

            <div
              key={index}
              className="border-l-4 border-slate-200 pl-4"
            >

              {/* Activity Type */}
              <div className="flex items-center gap-2">

                <span className="text-lg">
                  {getActivityIcon(activity.type)}
                </span>

                <h3 className="font-semibold text-base sm:text-lg text-slate-800">
                  {activity.title}
                </h3>

              </div>

              {/* Name */}
              <p className="font-medium text-slate-700 mt-1 ml-7">
                {activity.name}
              </p>

              {/* Date */}
              <p className="text-slate-500 text-sm mt-1 ml-7">
                {formatDate(activity.date)}
              </p>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default ActivityFeed;