import { useEffect, useState } from "react";
import API from "../services/api";

import CreateProjectModal from "../components/projects/CreateProjectModal";
import ProjectCard from "../components/projects/ProjectCard";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const getProjects = async () => {
    try {
      const res = await API.get("/projects");
      setProjects(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">

      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-5 mb-8">

        <div>

          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
            Projects
          </h1>

          <p className="text-sm sm:text-base text-slate-500 mt-2">
            Create, manage and monitor all your projects.
          </p>

        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white px-5 sm:px-6 py-3 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl"
        >
          + Create Project
        </button>

      </div>

      {/* Loading */}
      {loading ? (

        <div className="flex justify-center items-center h-60">

          <h2 className="text-lg sm:text-xl font-semibold text-slate-500">
            Loading Projects...
          </h2>

        </div>

      ) : projects.length === 0 ? (

        /* Empty State */
        <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 lg:p-16 text-center">

          <h2 className="text-2xl sm:text-3xl font-bold text-slate-700">
            No Projects Yet
          </h2>

          <p className="text-sm sm:text-base text-slate-500 mt-4">
            Click the button above to create your first project.
          </p>

        </div>

      ) : (

        /* Project Cards */
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">

          {projects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
            />
          ))}

        </div>

      )}

      {/* Create Project Modal */}
      {openModal && (
        <CreateProjectModal
          closeModal={() => setOpenModal(false)}
          refreshProjects={getProjects}
        />
      )}

    </div>
  );
}

export default Projects;