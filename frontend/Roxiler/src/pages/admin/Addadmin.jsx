import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Addadmin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/admin/newadmin",
        data,
        { withCredentials: true }
      );
      if (response.status == 201) {
        alert("Admin added successfully");
        navigate("/admin");
      }
    } catch (error) {
      console.error("Addadmin error:", error);
      if (error.response) {
        console.error("Server response:", error.response.data);
      }
      alert("Failed to add admin");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 shadow-md w-full max-w-sm rounded">
        <h2 className="text-center text-2xl font-semibold mb-4">Add Admin</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1">Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="w-full border border-gray-300 px-3 py-2"
            />
            {errors.name && (
              <p className="text-sm text-red-500">Name is required</p>
            )}
          </div>

          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full border border-gray-300 px-3 py-2"
            />
            {errors.email && (
              <p className="text-sm text-red-500">Email is required</p>
            )}
          </div>
          <div>
            <label className="block mb-1">Address</label>
            <input
              type="text"
              {...register("address", { required: true })}
              className="w-full border border-gray-300 px-3 py-2"
            />
            {errors.address && (
              <p className="text-sm text-red-500">Address is required</p>
            )}
          </div>
          <div>
            <label className="block mb-1">Password</label>
            <input
              type="password"
              {...register("password", { required: true })}
              className="w-full border border-gray-300 px-3 py-2"
            />
            {errors.password && (
              <p className="text-sm text-red-500">Password is required</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Add Admin
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addadmin;
