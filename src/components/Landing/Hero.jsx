import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="min-h-[85vh] flex items-center justify-center bg-slate-50">
      <div className="text-center max-w-3xl">

        <h1 className="text-6xl font-extrabold text-slate-900 leading-tight">
          Manage Projects
          <br />
          Collaborate with Teams
          <br />
          Deliver Faster
        </h1>

        <p className="mt-8 text-lg text-slate-600">
          A modern collaboration platform where teams manage projects,
          assign tasks, track progress, and work together efficiently.
        </p>

        <div className="mt-10 flex justify-center gap-5">

          <Link
            to="/register"
            className="bg-teal-600 px-8 py-4 rounded-xl text-white font-semibold hover:bg-teal-700 transition"
          >
            Start for Free
          </Link>

          <Link
            to="/login"
            className="border border-slate-300 px-8 py-4 rounded-xl text-slate-700 hover:bg-slate-100 transition"
          >
            Login
          </Link>

        </div>

      </div>
    </section>
  );
}

export default Hero;