function ProjectHeader({ project, members, tasks }) {

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const progress =
    tasks.length === 0
      ? 0
      : Math.round((completedTasks / tasks.length) * 100);

  return (
    <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl lg:rounded-3xl p-5 sm:p-6 lg:p-8 text-white shadow-xl">

      {/* Header */}

      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6">

        <div className="flex-1">

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold break-words">
            {project.name}
          </h1>

          <p className="mt-3 text-sm sm:text-base text-teal-100 leading-relaxed">
            {project.description}
          </p>

        </div>

        <div>

          <span className="inline-block bg-white/20 px-4 sm:px-5 py-2 rounded-full text-sm sm:text-base font-semibold">
            {project.status}
          </span>

        </div>

      </div>

      {/* Cards */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mt-8 lg:mt-10">

        <div className="bg-white/10 rounded-2xl p-5">

          <p className="text-teal-100 text-sm sm:text-base">
            Team Members
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold mt-2">
            {members.length}
          </h2>

        </div>

        <div className="bg-white/10 rounded-2xl p-5">

          <p className="text-teal-100 text-sm sm:text-base">
            Deadline
          </p>

          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mt-2 break-words">
            {new Date(project.deadline).toLocaleDateString()}
          </h2>

        </div>

        <div className="bg-white/10 rounded-2xl p-5">

          <p className="text-teal-100 text-sm sm:text-base">
            Project Status
          </p>

          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mt-2">
            {project.status}
          </h2>

        </div>

      </div>

      {/* Progress Bar */}

      <div className="mt-8 lg:mt-10">

        <div className="flex justify-between items-center mb-2">

          <h3 className="font-semibold text-sm sm:text-base">
            Project Progress
          </h3>

          <span className="font-bold text-sm sm:text-base">
            {progress}%
          </span>

        </div>

        <div className="w-full h-3 sm:h-4 bg-white/30 rounded-full overflow-hidden">

          <div
            className="h-full bg-green-400 transition-all duration-700"
            style={{
              width: `${progress}%`,
            }}
          ></div>

        </div>

        <p className="mt-3 text-xs sm:text-sm text-teal-100">
          {completedTasks} of {tasks.length} Tasks Completed
        </p>

      </div>

    </div>
  );
}

export default ProjectHeader;