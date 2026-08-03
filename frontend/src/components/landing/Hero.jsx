import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="bg-slate-50 min-h-[90vh] flex items-center">

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        {/* Left Side */}
        <div>

          <span className="bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-semibold">
            Team Collaboration Platform
          </span>

          <h1 className="text-6xl font-bold mt-6 text-slate-900 leading-tight">
            Manage Projects
            <br />
            Without the
            <span className="text-teal-600"> Chaos</span>
          </h1>

          <p className="mt-6 text-lg text-slate-600 leading-8">
            TaskFlow helps teams organize projects, assign tasks,
            collaborate efficiently, and track progress—all in one place.
          </p>

          <div className="flex gap-5 mt-10">

            <Link
              to="/register"
              className="bg-teal-600 text-white px-8 py-4 rounded-xl hover:bg-teal-700 transition"
            >
              Start Free
            </Link>

            <Link
              to="/login"
              className="border border-gray-300 px-8 py-4 rounded-xl hover:bg-gray-100"
            >
              Login
            </Link>

          </div>

        </div>

        {/* Right Side */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">

          <h2 className="text-2xl font-bold mb-6">
            Dashboard Preview
          </h2>

          <div className="space-y-4">

            <div className="bg-slate-100 p-4 rounded-xl">
              📁 HarmoniQ
            </div>

            <div className="bg-slate-100 p-4 rounded-xl">
              👥 Members : 5
            </div>

            <div className="bg-slate-100 p-4 rounded-xl">
              ✅ Tasks : 15 / 20
            </div>

            <div className="bg-slate-100 p-4 rounded-xl">
              📈 Progress : 75%
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;