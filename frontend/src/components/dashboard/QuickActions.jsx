import { useNavigate } from "react-router-dom";

function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 lg:p-8">

      <h2 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-6">
        Quick Action
      </h2>

      <button
        onClick={() => navigate("/projects")}
        className="w-full bg-teal-600 hover:bg-teal-700 text-white text-base sm:text-lg font-semibold py-3 sm:py-4 rounded-xl transition-all duration-300 hover:shadow-lg"
      >
        + Create Project
      </button>

    </div>
  );
}

export default QuickActions;