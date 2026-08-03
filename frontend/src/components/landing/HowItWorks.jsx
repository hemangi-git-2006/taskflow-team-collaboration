import {
  FaFolderPlus,
  FaUserFriends,
  FaTasks,
  FaChartLine,
} from "react-icons/fa";

function HowItWorks() {
  const steps = [
    {
      icon: <FaFolderPlus size={35} />,
      title: "Create Project",
      desc: "Start a new project and add basic details.",
    },
    {
      icon: <FaUserFriends size={35} />,
      title: "Invite Members",
      desc: "Invite teammates and assign their roles.",
    },
    {
      icon: <FaTasks size={35} />,
      title: "Assign Tasks",
      desc: "Create tasks and assign them to your team.",
    },
    {
      icon: <FaChartLine size={35} />,
      title: "Track Progress",
      desc: "Monitor progress with dashboards and reports.",
    },
  ];

  return (
    <section
      id="how"
      className="py-24 bg-slate-50"
    >
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center text-slate-900">
          How It Works
        </h2>

        <p className="text-center text-slate-600 mt-5">
          Manage your projects in four simple steps.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mt-16">

          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8 text-center hover:-translate-y-2 transition duration-300"
            >
              <div className="text-teal-600 flex justify-center">
                {step.icon}
              </div>

              <h3 className="text-2xl font-semibold mt-6">
                {step.title}
              </h3>

              <p className="text-slate-600 mt-4">
                {step.desc}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default HowItWorks;