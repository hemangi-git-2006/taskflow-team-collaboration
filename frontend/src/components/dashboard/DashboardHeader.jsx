import { FaPlus } from "react-icons/fa";

function DashboardHeader() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col md:flex-row justify-between items-center">

      <div>
        <h1 className="text-4xl font-bold text-slate-800">
          Welcome Back, Hemangi 👋
        </h1>

        <p className="mt-2 text-slate-500">
          Here's what's happening across your projects today.
        </p>
      </div>

      <button className="mt-5 md:mt-0 flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl transition">
        <FaPlus />
        Create Project
      </button>

    </div>
  );
}

export default DashboardHeader;