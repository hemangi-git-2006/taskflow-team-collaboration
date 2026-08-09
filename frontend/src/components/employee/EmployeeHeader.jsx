import {
  FaBell,
  FaSearch,
  FaUserCircle,
} from "react-icons/fa";

function EmployeeHeader() {
  const user = JSON.parse(localStorage.getItem("user"));

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-white rounded-2xl shadow-lg p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

      {/* Left */}

      <div>

        <h1 className="text-3xl font-bold text-slate-800">
          Welcome,
          <span className="text-teal-600">
            {" "}
            {user?.fullName}
          </span>
          👋
        </h1>

        <p className="text-slate-500 mt-2">
          {today}
        </p>

      </div>

      {/* Right */}

      <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">

        {/* Search */}

        <div className="relative w-full sm:w-80">

          <FaSearch className="absolute left-4 top-4 text-slate-400" />

          <input
            type="text"
            placeholder="Search task..."
            className="w-full border rounded-xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
          />

        </div>

        {/* Notification */}

        <button className="relative bg-slate-100 hover:bg-slate-200 w-12 h-12 rounded-xl flex items-center justify-center">

          <FaBell className="text-xl text-slate-700" />

          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            3
          </span>

        </button>

        {/* Profile */}

        <div className="flex items-center gap-3 bg-slate-100 px-4 py-2 rounded-xl">

          <FaUserCircle className="text-4xl text-teal-600" />

          <div>

            <h3 className="font-semibold">
              {user?.fullName}
            </h3>

            <p className="text-sm text-slate-500">
              Member
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default EmployeeHeader;