import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Added for navigation

const Login = () => {
  const navigate = useNavigate(); // Hook for navigation

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function loginuser(data) {
    try {
      console.log("Form data:", data);
      const response = await axios.post(
        "http://localhost:3000/api/user/auth/login",
        data,
        { withCredentials: true }
      );
      const { role } = response.data;
      if (role === "ADMIN") {
        navigate("/admin");
      } else if (role === "USER") {
        navigate("/user");
      } else if (role === "STORE_OWNER") {
        navigate("/store");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response) {
        console.error("Server response:", error.response.data);
      }
      alert("Login failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-center mb-4">Login</h1>
        <form onSubmit={handleSubmit(loginuser)} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-1 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">Email is required</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">Password is required</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
