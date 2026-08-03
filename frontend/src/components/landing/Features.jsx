import {
  FaUsers,
  FaTasks,
  FaChartLine,
  FaBell,
} from "react-icons/fa";

function Features() {
  const features = [
    {
      icon: <FaUsers size={40} />,
      title: "Team Collaboration",
      description:
        "Invite teammates, assign roles, and work together in real time.",
    },
    {
      icon: <FaTasks size={40} />,
      title: "Task Management",
      description:
        "Create, assign, and organize tasks with deadlines and priorities.",
    },
    {
      icon: <FaChartLine size={40} />,
      title: "Progress Tracking",
      description:
        "Monitor project completion with visual progress indicators.",
    },
    {
      icon: <FaBell size={40} />,
      title: "Notifications",
      description:
        "Never miss deadlines or important project updates.",
    },
  ];

  return (
    <section
      id="features"
      className="py-24 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center text-slate-900">
          Everything you need
        </h2>

        <p className="text-center text-slate-600 mt-5 max-w-2xl mx-auto">
          Powerful tools designed for teams to collaborate,
          organize work, and deliver projects efficiently.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

          {features.map((item, index) => (
            <div
              key={index}
              className="bg-slate-50 rounded-2xl p-8 shadow hover:shadow-xl transition duration-300"
            >
              <div className="text-teal-600">
                {item.icon}
              </div>

              <h3 className="text-xl font-semibold mt-6">
                {item.title}
              </h3>

              <p className="text-slate-600 mt-4">
                {item.description}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default Features;