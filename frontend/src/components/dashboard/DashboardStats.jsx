import {
  FaProjectDiagram,
  FaUsers,
  FaCheckCircle,
  FaClock,
  FaTasks,
} from "react-icons/fa";

import { MdPendingActions } from "react-icons/md";

function DashboardStats({
  totalProjects = 0,
  totalMembers = 0,
  totalTasks = 0,
  completedTasks = 0,
  inProgressTasks = 0,
  todoTasks = 0,
}) {
  const cards = [
    {
      title: "Projects",
      value: totalProjects,
      icon: <FaProjectDiagram size={28} />,
      color: "bg-blue-500",
    },
    {
      title: "Members",
      value: totalMembers,
      icon: <FaUsers size={28} />,
      color: "bg-purple-500",
    },
    {
      title: "Completed",
      value: completedTasks,
      icon: <FaCheckCircle size={28} />,
      color: "bg-green-500",
    },
    {
      title: "In Progress",
      value: inProgressTasks,
      icon: <FaClock size={28} />,
      color: "bg-yellow-500",
    },
    {
      title: "Todo",
      value: todoTasks,
      icon: <MdPendingActions size={28} />,
      color: "bg-red-500",
    },
    {
      title: "Total Tasks",
      value: totalTasks,
      icon: <FaTasks size={28} />,
      color: "bg-cyan-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">

      {cards.map((card) => (

        <div
          key={card.title}
          className="group bg-white rounded-2xl lg:rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-200"
        >

          <div className="flex justify-between items-center">

            <div className="flex-1">

              <p className="text-slate-500 text-base sm:text-lg font-medium">
                {card.title}
              </p>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 sm:mt-4 text-slate-800">
                {card.value ?? 0}
              </h2>

            </div>

            <div
              className={`${card.color} w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex justify-center items-center text-white shadow-lg group-hover:scale-110 transition-all duration-300 flex-shrink-0`}
            >
              {card.icon}
            </div>

          </div>

        </div>

      ))}

    </div>
  );
}

export default DashboardStats;