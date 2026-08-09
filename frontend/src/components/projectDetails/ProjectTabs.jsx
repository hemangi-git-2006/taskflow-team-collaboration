function ProjectTabs({ activeTab, setActiveTab }) {
  const tabs = [
    {
      id: "overview",
      label: "Overview",
      icon: "📊",
    },
    {
      id: "members",
      label: "Members",
      icon: "👥",
    },
    {
      id: "tasks",
      label: "Tasks",
      icon: "✅",
    },
    {
      id: "activity",
      label: "Activity",
      icon: "📜",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg mt-6 lg:mt-8 p-2 sm:p-3">

      {/* Scrollable Tabs on Mobile */}
      <div className="flex gap-2 sm:gap-3 overflow-x-auto whitespace-nowrap scrollbar-hide">

        {tabs.map((tab) => (

          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center justify-center gap-2
              min-w-max
              px-4 sm:px-6
              py-2.5 sm:py-3
              rounded-xl
              text-sm sm:text-base
              font-semibold
              transition-all
              duration-300

              ${
                activeTab === tab.id
                  ? "bg-teal-600 text-white shadow-lg"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-700"
              }
            `}
          >

            <span className="text-lg">
              {tab.icon}
            </span>

            <span>
              {tab.label}
            </span>

          </button>

        ))}

      </div>

    </div>
  );
}

export default ProjectTabs;