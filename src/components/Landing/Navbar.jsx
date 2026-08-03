import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="w-full h-20 flex items-center justify-between px-10 border-b border-slate-200 bg-white">
      <h1 className="text-3xl font-bold text-teal-600">
        TaskFlow
      </h1>

      <div className="flex items-center gap-6">
        <Link
          to="/login"
          className="text-slate-700 hover:text-teal-600 font-medium"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="bg-teal-600 text-white px-5 py-2 rounded-lg hover:bg-teal-700 transition"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;