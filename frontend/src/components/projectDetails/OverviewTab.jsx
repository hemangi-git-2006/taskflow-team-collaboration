function OverviewTab({ project, members, tasks }) {
  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const progress =
    tasks.length === 0
      ? 0
      : Math.round((completedTasks / tasks.length) * 100);

  return (
    <div className="space-y-6 lg:space-y-8">

      {/* Project Description */}

      <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 lg:p-8">

        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-4">
          📄 Project Description
        </h2>

        <p className="text-sm sm:text-base text-slate-600 leading-7 sm:leading-8 break-words">
          {project.description}
        </p>

      </div>

      {/* Statistics */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">

        <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6">

          <p className="text-slate-500 text-sm sm:text-base">
            Team Members
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold text-teal-600 mt-3">
            {members.length}
          </h2>

        </div>

        <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6">

          <p className="text-slate-500 text-sm sm:text-base">
            Total Tasks
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold text-blue-600 mt-3">
            {tasks.length}
          </h2>

        </div>

        <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6">

          <p className="text-slate-500 text-sm sm:text-base">
            Completed Tasks
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold text-green-600 mt-3">
            {completedTasks}
          </h2>

        </div>

      </div>

      {/* Progress */}

      <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 lg:p-8">

        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">

          <h2 className="text-xl sm:text-2xl font-bold">
            Project Progress
          </h2>

          <h2 className="text-lg sm:text-xl font-semibold text-teal-600">
            {progress}%
          </h2>

        </div>

        <div className="w-full bg-slate-200 rounded-full h-3 sm:h-4 mt-5 sm:mt-6">

          <div
            className="bg-teal-600 h-3 sm:h-4 rounded-full transition-all duration-500"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

        <p className="text-xs sm:text-sm text-slate-500 mt-3">
          {completedTasks} of {tasks.length} tasks completed
        </p>

      </div>

    </div>
  );
}

export default OverviewTab;