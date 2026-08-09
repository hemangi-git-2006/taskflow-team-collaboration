import { Link } from "react-router-dom";
import {
  FaCalendarAlt,
  FaUsers,
  FaFolderOpen,
} from "react-icons/fa";

function ProjectCard({ project }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";

      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 p-5 sm:p-6 border">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">

        <div className="flex items-center gap-3 min-w-0">

          <div className="bg-teal-100 p-3 rounded-xl flex-shrink-0">
            <FaFolderOpen className="text-teal-600 text-xl sm:text-2xl" />
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 truncate">
            {project.name}
          </h2>

        </div>

        <span
          className={`self-start sm:self-auto px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${getStatusColor(
            project.status
          )}`}
        >
          {project.status}
        </span>

      </div>

      {/* Description */}
      <p className="text-slate-500 mt-5 text-sm sm:text-base leading-relaxed line-clamp-3">
        {project.description}
      </p>

      {/* Project Info */}
      <div className="mt-6 space-y-3">

        <div className="flex items-center gap-2 text-sm sm:text-base">

          <FaCalendarAlt className="text-red-500 flex-shrink-0" />

          <span>
            {new Date(project.deadline).toLocaleDateString()}
          </span>

        </div>

        <div className="flex items-center gap-2 text-sm sm:text-base">

          <FaUsers className="text-blue-500 flex-shrink-0" />

          <span>
            {project.members?.length || 0} Members
          </span>

        </div>

      </div>

      {/* Button */}
      <Link
        to={`/projects/${project._id}`}
        className="block mt-6 sm:mt-8 bg-teal-600 hover:bg-teal-700 text-white text-center text-sm sm:text-base font-semibold py-3 rounded-xl transition-all duration-300 hover:shadow-lg"
      >
        Open Project
      </Link>

    </div>
  );
}

export default ProjectCard;