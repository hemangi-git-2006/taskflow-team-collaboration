import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [loginAs, setLoginAs] = useState("Admin");
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    employeeId: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        loginAs,
        password: formData.password,
      };

      if (loginAs === "Admin") {
        payload.email = formData.email
          .trim()
          .toLowerCase();
      } else {
        payload.employeeId = formData.employeeId
          .trim()
          .toUpperCase();
      }

      const res = await API.post(
        "/auth/login",
        payload
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      localStorage.setItem(
        "role",
        res.data.user.role
      );

      alert("Login Successful");

      if (res.data.user.role === "Admin") {
        navigate("/dashboard");
      } else {
        navigate("/employee-dashboard");
      }

    } catch (error) {
      console.log(
        "LOGIN ERROR:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Login Failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">

      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-center">
          Welcome Back 👋
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Login to your TaskFlow account
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 mt-8"
        >

          {/* Login As */}
          <div>
            <label className="block mb-2 font-medium">
              Login As
            </label>

            <select
              value={loginAs}
              onChange={(e) =>
                setLoginAs(e.target.value)
              }
              className="w-full border rounded-lg px-4 py-3"
            >
              <option value="Admin">
                Admin
              </option>

              <option value="Member">
                Member
              </option>
            </select>
          </div>

          {/* Email or Employee ID */}
          {loginAs === "Admin" ? (
            <div>
              <label className="block mb-2 font-medium">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@gmail.com"
                className="w-full border rounded-lg px-4 py-3"
                required
              />
            </div>
          ) : (
            <div>
              <label className="block mb-2 font-medium">
                Employee ID
              </label>

              <input
                type="text"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
                placeholder="EMP001"
                className="w-full border rounded-lg px-4 py-3"
                required
              />
            </div>
          )}

          {/* Password */}
          <div>
            <label className="block mb-2 font-medium">
              Password
            </label>

            <div className="relative">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 pr-12"
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="absolute right-4 top-4"
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>

            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700"
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>

        </form>

        <p className="text-center mt-6">
          Admin doesn't have an account?{" "}
          <Link
            to="/register"
            className="text-teal-600 font-semibold"
          >
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;