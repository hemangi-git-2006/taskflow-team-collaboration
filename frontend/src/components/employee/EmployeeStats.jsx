import {
  FaTasks,
  FaCheckCircle,
  FaClock,
  FaFolderOpen,
} from "react-icons/fa";

function EmployeeStats({
  totalTasks = 0,
  completedTasks = 0,
  pendingTasks = 0,
  totalProjects = 0,
}) {
  const cards = [
    {
      title: "Assigned Tasks",
      value: totalTasks,
      icon: <FaTasks size={28} />,
      color: "bg-blue-500",
    },
    {
      title: "Completed",
      value: completedTasks,
      icon: <FaCheckCircle size={28} />,
      color: "bg-green-500",
    },
    {
      title: "Pending",
      value: pendingTasks,
      icon: <FaClock size={28} />,
      color: "bg-yellow-500",
    },
    {
      title: "Projects",
      value: totalProjects,
      icon: <FaFolderOpen size={28} />,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

      {cards.map((card) => (

        <div
          key={card.title}
          className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300"
        >

          <div className="flex justify-between items-center">

            <div>

              <p className="text-slate-500 text-lg">
                {card.title}
              </p>

              <h2 className="text-4xl font-bold mt-3 text-slate-800">
                {card.value}
              </h2>

            </div>

            <div
              className={`${card.color} w-16 h-16 rounded-2xl flex justify-center items-center text-white shadow-lg`}
            >
              {card.icon}
            </div>

          </div>

        </div>

      ))}

    </div>
  );
}

export default EmployeeStats;