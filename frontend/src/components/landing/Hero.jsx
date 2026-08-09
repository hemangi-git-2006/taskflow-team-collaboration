import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

function Hero() {
  return (
    <section className="bg-slate-100 min-h-[90vh] flex items-center">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">

        {/* Left Content */}
        <div>

          <span className="bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-semibold">
            🚀 Smart Team Collaboration
          </span>

          <h1 className="text-5xl lg:text-6xl font-bold text-slate-800 mt-6 leading-tight">
            Manage Your Team
            <span className="text-teal-600"> Smarter</span>
          </h1>

          <p className="text-slate-600 text-lg mt-6 leading-8">
            TaskFlow helps teams organize projects, assign tasks,
            track progress and collaborate from one place.
          </p>

          <div className="flex gap-5 mt-8">

            <Link
              to="/register"
              className="bg-teal-600 text-white px-7 py-3 rounded-lg hover:bg-teal-700 transition"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="border border-slate-300 px-7 py-3 rounded-lg hover:bg-white transition"
            >
              Login
            </Link>

          </div>

          <div className="grid grid-cols-2 gap-4 mt-10">

            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-teal-600" />
              <span>Unlimited Projects</span>
            </div>

            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-teal-600" />
              <span>Task Assignment</span>
            </div>

            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-teal-600" />
              <span>Real-time Updates</span>
            </div>

            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-teal-600" />
              <span>Team Collaboration</span>
            </div>

          </div>

        </div>

        {/* Right Side */}
        <div className="flex justify-center">

          <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">

            <h2 className="text-2xl font-bold mb-6">
              Project Overview
            </h2>

            <div className="space-y-5">

              <div className="bg-slate-100 rounded-xl p-4">
                <p className="font-semibold">Website Redesign</p>
                <p className="text-sm text-slate-500 mt-1">
                  Progress
                </p>

                <div className="w-full bg-gray-300 rounded-full h-2 mt-3">
                  <div className="bg-teal-600 h-2 rounded-full w-4/5"></div>
                </div>
              </div>

              <div className="bg-slate-100 rounded-xl p-4">
                <p className="font-semibold">Mobile App</p>
                <p className="text-sm text-slate-500 mt-1">
                  Progress
                </p>

                <div className="w-full bg-gray-300 rounded-full h-2 mt-3">
                  <div className="bg-blue-500 h-2 rounded-full w-2/3"></div>
                </div>
              </div>

              <div className="bg-slate-100 rounded-xl p-4">
                <p className="font-semibold">Marketing</p>
                <p className="text-sm text-slate-500 mt-1">
                  Progress
                </p>

                <div className="w-full bg-gray-300 rounded-full h-2 mt-3">
                  <div className="bg-purple-500 h-2 rounded-full w-1/2"></div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;