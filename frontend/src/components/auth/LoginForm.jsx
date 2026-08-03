import { Link } from "react-router-dom";
import { FaEye, FaGoogle } from "react-icons/fa";
import { useState } from "react";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-slate-800 text-center">
          Welcome Back 👋
        </h1>

        <p className="text-slate-500 text-center mt-2">
          Sign in to continue to your workspace
        </p>

        <form className="mt-8 space-y-5">

          {/* Email */}
          <div>
            <label className="block mb-2 font-medium text-slate-700">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:border-teal-600"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 font-medium text-slate-700">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full border border-slate-300 rounded-lg px-4 py-3 pr-12 outline-none focus:border-teal-600"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4 text-slate-500"
              >
                <FaEye />
              </button>
            </div>
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between text-sm">

            <label className="flex items-center gap-2 text-slate-600">
              <input type="checkbox" />
              Remember me
            </label>

            <Link
              to="/forgot-password"
              className="text-teal-600 hover:underline"
            >
              Forgot Password?
            </Link>

          </div>

          {/* Login Button */}

          <button
            className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition"
          >
            Sign In
          </button>

          {/* Divider */}

          <div className="flex items-center gap-3">

            <hr className="flex-1" />

            <span className="text-slate-400 text-sm">
              OR
            </span>

            <hr className="flex-1" />

          </div>

          {/* Google */}

          <button
            type="button"
            className="w-full border border-slate-300 py-3 rounded-lg flex justify-center items-center gap-3 hover:bg-slate-100 transition"
          >
            <FaGoogle />
            Continue with Google
          </button>

        </form>

        <p className="text-center mt-6 text-slate-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-teal-600 font-semibold hover:underline"
          >
            Create Account
          </Link>
        </p>

      </div>
    </div>
  );
}

export default LoginForm;