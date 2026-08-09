import {
  FaFolderOpen,
  FaTasks,
  FaCheckCircle,
} from "react-icons/fa";

function EmployeeProjectSelector({
  projects,
  selectedProject,
  setSelectedProject,
  tasks = [],
}) {

  const getProjectTasks = (projectId) => {
    return tasks.filter(
      (task) => task.project?._id === projectId
    );
  };

  const getProgress = (projectId) => {

    const projectTasks = getProjectTasks(projectId);

    if (projectTasks.length === 0) {
      return 0;
    }

    const completed = projectTasks.filter(
      (task) => task.status === "Completed"
    ).length;

    return Math.round(
      (completed / projectTasks.length) * 100
    );
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-5 sm:p-6">

      {/* Header */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">

        <div>

          <h2 className="text-2xl font-bold text-slate-800">
            My Projects
          </h2>

          <p className="text-slate-500 mt-1">
            Select a project to view its tasks
          </p>

        </div>

        {/* All Projects */}

        <button
          onClick={() => setSelectedProject("")}
          className={`px-5 py-2.5 rounded-xl font-semibold transition ${
            selectedProject === ""
              ? "bg-teal-600 text-white shadow-md"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          All Projects
        </button>

      </div>

      {/* Project Cards */}

      {projects.length === 0 ? (

        <div className="text-center py-10">

          <FaFolderOpen className="mx-auto text-5xl text-slate-300 mb-4" />

          <h3 className="text-xl font-semibold text-slate-700">
            No Projects Found
          </h3>

          <p className="text-slate-500 mt-2">
            Projects will appear here when tasks are assigned to you.
          </p>

        </div>

      ) : (

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">

          {projects.map((project) => {

            const projectTasks =
              getProjectTasks(project._id);

            const progress =
              getProgress(project._id);

            const isSelected =
              selectedProject === project._id;

            return (

              <button
                key={project._id}
                onClick={() =>
                  setSelectedProject(project._id)
                }
                className={`text-left rounded-2xl border-2 p-5 transition-all duration-300 ${
                  isSelected
                    ? "border-teal-600 bg-teal-50 shadow-lg"
                    : "border-slate-200 bg-white hover:border-teal-400 hover:shadow-md"
                }`}
              >

                {/* Project Header */}

                <div className="flex items-start justify-between gap-3">

                  <div className="flex items-center gap-3">

                    <div
                      className={`p-3 rounded-xl ${
                        isSelected
                          ? "bg-teal-600 text-white"
                          : "bg-teal-100 text-teal-600"
                      }`}
                    >
                      <FaFolderOpen size={22} />
                    </div>

                    <div>

                      <h3 className="font-bold text-lg text-slate-800">
                        {project.name}
                      </h3>

                      <p className="text-sm text-slate-500">
                        {projectTasks.length} Task(s)
                      </p>

                    </div>

                  </div>

                  {isSelected && (

                    <FaCheckCircle
                      className="text-teal-600"
                      size={22}
                    />

                  )}

                </div>

                {/* Progress */}

                <div className="mt-6">

                  <div className="flex justify-between items-center mb-2">

                    <span className="text-sm font-medium text-slate-600">
                      Progress
                    </span>

                    <span className="text-sm font-bold text-teal-600">
                      {progress}%
                    </span>

                  </div>

                  <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">

                    <div
                      className="h-full bg-teal-600 rounded-full transition-all duration-500"
                      style={{
                        width: `${progress}%`,
                      }}
                    />

                  </div>

                </div>

                {/* Task Count */}

                <div className="flex items-center gap-2 mt-5 text-sm text-slate-500">

                  <FaTasks />

                  <span>
                    {projectTasks.filter(
                      (task) =>
                        task.status === "Completed"
                    ).length}{" "}
                    completed
                  </span>

                </div>

              </button>

            );

          })}

        </div>

      )}

    </div>
  );
}

export default EmployeeProjectSelector;