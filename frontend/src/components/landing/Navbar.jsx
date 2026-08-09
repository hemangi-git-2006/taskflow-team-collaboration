import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1 className="text-3xl font-bold text-teal-600">
          TaskFlow
        </h1>

        <div className="hidden md:flex items-center gap-8">

          <a href="#features" className="hover:text-teal-600">
            Features
          </a>

          <a href="#how" className="hover:text-teal-600">
            How It Works
          </a>

          <a href="#contact" className="hover:text-teal-600">
            Contact
          </a>

        </div>

        <div className="flex gap-4">

          <Link
            to="/login"
            className="px-5 py-2 border border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-5 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
          >
            Get Started
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;