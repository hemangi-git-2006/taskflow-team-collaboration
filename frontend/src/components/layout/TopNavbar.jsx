import { FaSearch, FaMoon, FaUserCircle } from "react-icons/fa";

function TopNavbar() {
  return (
    <header className="bg-white rounded-2xl shadow p-5 flex items-center justify-between">

      <div>
        <h2 className="text-3xl font-bold text-slate-800">
          Dashboard
        </h2>

        <p className="text-slate-500">
          Welcome back 👋
        </p>
      </div>

      <div className="flex items-center gap-5">

        <div className="relative">

          <input
            type="text"
            placeholder="Search..."
            className="border rounded-xl px-4 py-2 pl-10 outline-none focus:border-teal-500"
          />

          <FaSearch className="absolute left-3 top-3 text-slate-400" />

        </div>

        <button className="text-2xl">
          <FaMoon />
        </button>

        <button className="text-3xl text-slate-600">
          <FaUserCircle />
        </button>

      </div>

    </header>
  );
}

export default TopNavbar;