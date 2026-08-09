function ActivityTab({ project, members, tasks }) {
  return (
    <div>

      {/* Header */}

      <div className="mb-6 lg:mb-8">

        <h2 className="text-3xl sm:text-4xl font-bold text-slate-800">
          Activity Timeline
        </h2>

        <p className="text-sm sm:text-base text-slate-500 mt-2">
          Track everything happening inside this project
        </p>

      </div>

      <div className="space-y-5 lg:space-y-6">

        {/* Project Created */}

        <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-5 items-start">

          <div className="w-12 h-12 rounded-full bg-teal-100 flex justify-center items-center text-xl shrink-0">
            🚀
          </div>

          <div>

            <h3 className="font-bold text-lg">
              Project Created
            </h3>

            <p className="text-slate-500 mt-1 break-words">
              {project.name} project was created successfully.
            </p>

          </div>

        </div>

        {/* Members */}

        <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-5 items-start">

          <div className="w-12 h-12 rounded-full bg-blue-100 flex justify-center items-center text-xl shrink-0">
            👥
          </div>

          <div>

            <h3 className="font-bold text-lg">
              Members Added
            </h3>

            <p className="text-slate-500 mt-1">
              Total Members : {members.length}
            </p>

          </div>

        </div>

        {/* Tasks */}

        <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-5 items-start">

          <div className="w-12 h-12 rounded-full bg-yellow-100 flex justify-center items-center text-xl shrink-0">
            📋
          </div>

          <div>

            <h3 className="font-bold text-lg">
              Tasks Created
            </h3>

            <p className="text-slate-500 mt-1">
              Total Tasks : {tasks.length}
            </p>

          </div>

        </div>

        {/* Task Activity */}

        {tasks.map((task) => (

          <div
            key={task._id}
            className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-5 items-start"
          >

            <div className="w-12 h-12 rounded-full bg-green-100 flex justify-center items-center text-xl shrink-0">
              ✅
            </div>

            <div className="flex-1">

              <h3 className="font-bold text-lg break-words">
                {task.title}
              </h3>

              <p className="text-slate-500 mt-1">

                Assigned to{" "}

                <span className="font-semibold">
                  {task.assignedTo?.fullName || "Not Assigned"}
                </span>

              </p>

              <div className="mt-3 flex flex-wrap gap-2">

                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                  {task.priority}
                </span>

                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                  {task.status}
                </span>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default ActivityTab;