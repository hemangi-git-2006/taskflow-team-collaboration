import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-10">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-center text-slate-800">
          Create Your Account 🚀
        </h1>

        <p className="text-center text-slate-500 mt-2">
          Join your team and start collaborating.
        </p>

        <form className="space-y-5 mt-8">

          <div>
            <label className="block mb-2 font-medium">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Hemangi Manjrekar"
              className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:border-teal-600"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Username
            </label>

            <input
              type="text"
              placeholder="hemangi"
              className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:border-teal-600"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Email Address
            </label>

            <input
              type="email"
              placeholder="example@gmail.com"
              className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:border-teal-600"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                className="w-full border border-slate-300 rounded-lg px-4 py-3 pr-12 outline-none focus:border-teal-600"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4 text-slate-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Confirm Password
            </label>

            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm password"
                className="w-full border border-slate-300 rounded-lg px-4 py-3 pr-12 outline-none focus:border-teal-600"
              />

              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-4 text-slate-500"
              >
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" />
            I agree to the Terms & Conditions
          </label>

          <button
            className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition"
          >
            Create Account
          </button>

        </form>

        <p className="text-center mt-6 text-slate-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-teal-600 font-semibold hover:underline"
          >
            Sign In
          </Link>
        </p>

      </div>
    </div>
  );
}

export default RegisterForm;