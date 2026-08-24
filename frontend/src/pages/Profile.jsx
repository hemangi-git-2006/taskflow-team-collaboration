import { useEffect, useState } from "react";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return (
      <div className="p-8">
        <h2 className="text-xl font-semibold">No profile data found</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">

      <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
        My Profile
      </h1>

      <p className="text-slate-500 mt-2">
        Manage your admin profile information.
      </p>

      <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 sm:p-8 max-w-2xl">

        {/* Profile Image */}
        <div className="flex items-center gap-5 mb-8">

          <div className="w-20 h-20 rounded-full bg-teal-100 flex items-center justify-center text-3xl font-bold text-teal-700">
            {user.fullName?.charAt(0).toUpperCase()}
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              {user.fullName}
            </h2>

            <p className="text-slate-500">
              {user.role}
            </p>
          </div>

        </div>

        {/* Information */}
        <div className="space-y-5">

          <div>
            <p className="text-sm text-slate-500">
              Full Name
            </p>

            <p className="text-lg font-semibold text-slate-800">
              {user.fullName}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Email
            </p>

            <p className="text-lg font-semibold text-slate-800">
              {user.email}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Role
            </p>

            <p className="text-lg font-semibold text-teal-600">
              {user.role}
            </p>
          </div>

          {user.companyName && (
            <div>
              <p className="text-sm text-slate-500">
                Company
              </p>

              <p className="text-lg font-semibold text-slate-800">
                {user.companyName}
              </p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default Profile;