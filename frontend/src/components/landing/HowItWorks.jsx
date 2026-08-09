import {
  FaUserPlus,
  FaProjectDiagram,
  FaTasks,
  FaChartLine,
} from "react-icons/fa";

function HowItWorks() {
  const steps = [
    {
      icon: <FaUserPlus size={40} />,
      title: "1. Create an Account",
      description:
        "The admin registers and logs in to the TaskFlow platform.",
    },
    {
      icon: <FaProjectDiagram size={40} />,
      title: "2. Create Projects",
      description:
        "Create projects and add team members to collaborate efficiently.",
    },
    {
      icon: <FaTasks size={40} />,
      title: "3. Assign Tasks",
      description:
        "Assign tasks to members, set deadlines, and track task progress.",
    },
    {
      icon: <FaChartLine size={40} />,
      title: "4. Monitor Progress",
      description:
        "Track completed and pending tasks using the admin dashboard.",
    },
  ];

  return (
    <section
      id="how"
      className="py-20 bg-slate-100"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <h2 className="text-4xl font-bold text-slate-800">
            How TaskFlow Works
          </h2>

          <p className="text-slate-500 mt-4">
            Manage your projects in just four simple steps.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition duration-300"
            >
              <div className="text-teal-600 flex justify-center mb-6">
                {step.icon}
              </div>

              <h3 className="text-xl font-bold mb-3">
                {step.title}
              </h3>

              <p className="text-slate-500">
                {step.description}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default HowItWorks;