import {
  FaTasks,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
} from "react-icons/fa";

function EmployeeTaskSummary({ tasks }) {

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status !== "Completed"
  ).length;

  const highPriorityTasks = tasks.filter(
    (task) => task.priority === "High"
  ).length;

  const cards = [
    {
      title: "Total Tasks",
      value: totalTasks,
      icon: <FaTasks size={28} />,
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
    {
      title: "Completed",
      value: completedTasks,
      icon: <FaCheckCircle size={28} />,
      bg: "bg-green-100",
      text: "text-green-600",
    },
    {
      title: "Pending",
      value: pendingTasks,
      icon: <FaClock size={28} />,
      bg: "bg-yellow-100",
      text: "text-yellow-600",
    },
    {
      title: "High Priority",
      value: highPriorityTasks,
      icon: <FaExclamationTriangle size={28} />,
      bg: "bg-red-100",
      text: "text-red-600",
    },
  ];

  return (

    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

      {cards.map((card, index) => (

        <div
          key={index}
          className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition duration-300"
        >

          <div className="flex justify-between items-center">

            <div>

              <p className="text-slate-500 text-sm">

                {card.title}

              </p>

              <h2 className="text-4xl font-bold mt-3">

                {card.value}

              </h2>

            </div>

            <div
              className={`${card.bg} ${card.text} p-5 rounded-2xl`}
            >

              {card.icon}

            </div>

          </div>

        </div>

      ))}

    </div>

  );

}

export default EmployeeTaskSummary;