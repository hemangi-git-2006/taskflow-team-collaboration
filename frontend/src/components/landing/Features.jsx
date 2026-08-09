import {
  FaTasks,
  FaUsers,
  FaChartLine,
  FaBell,
  FaProjectDiagram,
  FaShieldAlt,
} from "react-icons/fa";

function Features() {
  const features = [
    {
      icon: <FaProjectDiagram size={35} />,
      title: "Project Management",
      description:
        "Create multiple projects, organize work, and track project progress with ease.",
    },
    {
      icon: <FaTasks size={35} />,
      title: "Task Assignment",
      description:
        "Assign tasks to team members, set priorities, and manage deadlines efficiently.",
    },
    {
      icon: <FaUsers size={35} />,
      title: "Team Collaboration",
      description:
        "Work together with your team and keep everyone updated in real time.",
    },
    {
      icon: <FaChartLine size={35} />,
      title: "Progress Tracking",
      description:
        "Monitor completed, pending, and in-progress tasks using interactive dashboards.",
    },
    {
      icon: <FaBell size={35} />,
      title: "Notifications",
      description:
        "Receive instant notifications whenever a task is assigned or completed.",
    },
    {
      icon: <FaShieldAlt size={35} />,
      title: "Secure Access",
      description:
        "Role-based authentication ensures only authorized users can access projects.",
    },
  ];

  return (
    <section
      id="features"
      className="py-20 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <h2 className="text-4xl font-bold text-slate-800">
            Powerful Features
          </h2>

          <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
            Everything you need to manage projects, collaborate with your team,
            and deliver work on time.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">

          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-slate-50 rounded-2xl p-8 shadow hover:shadow-xl transition duration-300"
            >
              <div className="text-teal-600 mb-5">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-semibold mb-3">
                {feature.title}
              </h3>

              <p className="text-slate-500">
                {feature.description}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Features;