function ActivityFeed() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 lg:p-8">

      <h2 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-6">
        Recent Activity
      </h2>

      <div className="space-y-5">

        <div className="border-l-4 border-teal-500 pl-4">

          <h3 className="font-semibold text-base sm:text-lg">
            No Activity Yet
          </h3>

          <p className="text-slate-500 text-sm sm:text-base mt-2">
            Your latest project updates will appear here.
          </p>

        </div>

      </div>

    </div>
  );
}

export default ActivityFeed;