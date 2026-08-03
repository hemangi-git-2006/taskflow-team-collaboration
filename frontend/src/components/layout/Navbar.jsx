import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="w-full bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-bold text-teal-600"
        >
          TaskFlow
        </Link>

        {/* Menu */}
        <div className="hidden md:flex gap-8 text-gray-700 font-medium">

          <a href="#features" className="hover:text-teal-600">
            Features
          </a>

          <a href="#how" className="hover:text-teal-600">
            How it Works
          </a>

          <a href="#about" className="hover:text-teal-600">
            About
          </a>

        </div>

        {/* Buttons */}
        <div className="flex gap-4">

          <Link
            to="/login"
            className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
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

      </div>
    </nav>
  );
}

export default Navbar;