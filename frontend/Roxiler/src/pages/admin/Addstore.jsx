import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Addstore = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "https://task-roxiler-systems-full-stack-developer.onrender.com/api/admin/newstore",
        data,
        { withCredentials: true }
      );
      if (response.status === 201) {
        alert("Store added successfully");
        navigate("/admin");
      }
    } catch (error) {
      console.error("Addstore error:", error);
      if (error.response) {
        console.error("Server response:", error.response.data);
      }
      alert("Failed to add store");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 shadow-md w-full max-w-sm rounded">
        <h2 className="text-center text-2xl font-semibold mb-4">Add Store</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1">Store Name</label>
            <input
              type="text"
              {...register("storename", { required: true })}
              className="w-full border border-gray-300 px-3 py-2"
            />
            {errors.storename && (
              <p className="text-sm text-red-500">Store name is required</p>
            )}
          </div>

          <div>
            <label className="block mb-1">Store Email</label>
            <input
              type="email"
              {...register("storemail", { required: true })}
              className="w-full border border-gray-300 px-3 py-2"
            />
            {errors.storemail && (
              <p className="text-sm text-red-500">Store email is required</p>
            )}
          </div>

          <div>
            <label className="block mb-1">Store Address</label>
            <input
              type="text"
              {...register("storaddress", { required: true })}
              className="w-full border border-gray-300 px-3 py-2"
            />
            {errors.storaddress && (
              <p className="text-sm text-red-500">Store address is required</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
          >
            Add Store
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addstore;
