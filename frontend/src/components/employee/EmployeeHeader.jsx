import { useState } from "react";
import {
  FaSearch,
  FaBell,
  FaUserCircle,
  FaTimes,
} from "react-icons/fa";

function EmployeeHeader({ tasks = [] }) {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [search, setSearch] = useState("");
  const [showNotifications, setShowNotifications] =
    useState(false);

  // ============================
  // Search Tasks
  // ============================

  const searchResults = tasks.filter((task) =>
    task.title
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  // ============================
  // Pending Tasks
  // ============================

  const pendingTasks = tasks.filter(
    (task) => task.status !== "Completed"
  );

  // ============================
  // User Name
  // ============================

  const userName =
    user?.fullName || "Employee";

  return (

    <header
      className="
        relative
        bg-white
        rounded-3xl
        shadow-lg
        border
        border-slate-100
        p-5
        sm:p-6
        lg:p-8
      "
    >

      <div
        className="
          flex
          flex-col
          xl:flex-row
          xl:items-center
          xl:justify-between
          gap-6
        "
      >

        {/* ============================
            Welcome
        ============================ */}

        <div>

          <h1
            className="
              text-3xl
              sm:text-4xl
              lg:text-5xl
              font-bold
              text-slate-800
            "
          >
            Welcome,{" "}

            <span className="text-teal-600">
              {userName}
            </span>

            <span className="ml-2">
              👋
            </span>

          </h1>

          <p className="text-slate-500 text-lg mt-2">
            {new Date().toLocaleDateString(
              "en-US",
              {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              }
            )}
          </p>

        </div>

        {/* ============================
            Right Section
        ============================ */}

        <div
          className="
            flex
            flex-col
            sm:flex-row
            items-stretch
            sm:items-center
            gap-3
            w-full
            xl:w-auto
          "
        >

          {/* ============================
              Search
          ============================ */}

          <div className="relative w-full sm:w-72 lg:w-96">

            <FaSearch
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search task..."
              className="
                w-full
                border
                border-slate-300
                rounded-2xl
                pl-12
                pr-10
                py-4
                outline-none
                focus:ring-2
                focus:ring-teal-500
                focus:border-teal-500
              "
            />

            {search && (

              <button
                onClick={() => setSearch("")}
                className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                  hover:text-slate-700
                "
              >
                <FaTimes />
              </button>

            )}

            {/* ============================
                Search Results
            ============================ */}

            {search && (

              <div
                className="
                  absolute
                  top-full
                  left-0
                  right-0
                  mt-2
                  bg-white
                  rounded-2xl
                  shadow-xl
                  border
                  border-slate-200
                  z-50
                  overflow-hidden
                "
              >

                {searchResults.length === 0 ? (

                  <div className="p-5 text-center text-slate-500">
                    No tasks found
                  </div>

                ) : (

                  <div className="max-h-72 overflow-y-auto">

                    {searchResults.map((task) => (

                      <div
                        key={task._id}
                        className="
                          px-5
                          py-4
                          border-b
                          last:border-b-0
                          hover:bg-slate-50
                          cursor-pointer
                        "
                      >

                        <h3 className="font-semibold text-slate-800">
                          {task.title}
                        </h3>

                        <div className="flex justify-between mt-1">

                          <span className="text-sm text-slate-500">
                            {task.project?.name ||
                              "No Project"}
                          </span>

                          <span className="text-sm text-slate-500">
                            {task.status}
                          </span>

                        </div>

                      </div>

                    ))}

                  </div>

                )}

              </div>

            )}

          </div>

          {/* ============================
              Notification
          ============================ */}

          <div className="relative">

            <button
              onClick={() =>
                setShowNotifications(
                  !showNotifications
                )
              }
              className="
                relative
                h-14
                w-14
                flex
                items-center
                justify-center
                bg-slate-100
                rounded-2xl
                hover:bg-slate-200
                transition
              "
            >

              <FaBell
                className="
                  text-xl
                  text-slate-700
                "
              />

              {pendingTasks.length > 0 && (

                <span
                  className="
                    absolute
                    -top-1
                    -right-1
                    min-w-6
                    h-6
                    px-1
                    rounded-full
                    bg-red-500
                    text-white
                    text-xs
                    font-bold
                    flex
                    items-center
                    justify-center
                  "
                >
                  {pendingTasks.length}
                </span>

              )}

            </button>

            {/* ============================
                Notification Dropdown
            ============================ */}

            {showNotifications && (

              <div
                className="
                  absolute
                  right-0
                  top-16
                  w-80
                  max-w-[90vw]
                  bg-white
                  rounded-2xl
                  shadow-2xl
                  border
                  border-slate-200
                  z-50
                  overflow-hidden
                "
              >

                <div
                  className="
                    px-5
                    py-4
                    border-b
                    flex
                    justify-between
                    items-center
                  "
                >

                  <h3 className="font-bold text-lg">
                    Notifications
                  </h3>

                  <span className="text-sm text-slate-500">
                    {pendingTasks.length} pending
                  </span>

                </div>

                {pendingTasks.length === 0 ? (

                  <div className="p-6 text-center">

                    <p className="text-slate-500">
                       No pending tasks
                    </p>

                  </div>

                ) : (

                  <div className="max-h-80 overflow-y-auto">

                    {pendingTasks.map((task) => (

                      <div
                        key={task._id}
                        className="
                          p-4
                          border-b
                          hover:bg-slate-50
                        "
                      >

                        <p className="font-semibold text-slate-800">
                          {task.title}
                        </p>

                        <p className="text-sm text-slate-500 mt-1">
                          Status: {task.status}
                        </p>

                        {task.deadline && (

                          <p className="text-xs text-red-500 mt-1">
                            Due:{" "}
                            {new Date(
                              task.deadline
                            ).toLocaleDateString()}
                          </p>

                        )}

                      </div>

                    ))}

                  </div>

                )}

              </div>

            )}

          </div>

          {/* ============================
              Profile
          ============================ */}

          <div
            className="
              flex
              items-center
              gap-3
              bg-slate-100
              rounded-2xl
              px-4
              py-2
              min-w-[180px]
            "
          >

            <div
              className="
                w-12
                h-12
                rounded-full
                bg-teal-600
                flex
                items-center
                justify-center
                text-white
              "
            >

              <FaUserCircle className="text-3xl" />

            </div>

            <div>

              <p className="font-bold text-slate-800">
                {userName}
              </p>

              <p className="text-sm text-slate-500">
                {user?.role || "Member"}
              </p>

            </div>

          </div>

        </div>

      </div>

    </header>

  );
}

export default EmployeeHeader;