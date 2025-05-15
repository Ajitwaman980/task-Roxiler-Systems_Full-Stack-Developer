import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StoreOwner = () => {
  const [stores, setStores] = useState([]);
  const navigate = useNavigate();
  const myStore = async () => {
    try {
      const res = await axios.get(
        "https://task-roxiler-systems-full-stack-developer.onrender.com/api/store/my-store",
        {
          withCredentials: true,
        }
      );
      setStores(res.data.stores);
    } catch (err) {
      console.error("Error fetching store data:", err);
    }
  };

  useEffect(() => {
    myStore();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get(
        "https://task-roxiler-systems-full-stack-developer.onrender.com/api/user/auth/logout",
        {
          withCredentials: true,
        }
      );
      alert("Logged out successfully");
      navigate("/login");
    } catch (err) {
      console.error("Logout error", err);
      alert("Logout failed");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Stores</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white"
      >
        Logout
      </button>
      {stores.map((store) => (
        <div
          key={store.id}
          className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-200"
        >
          <h2 className="text-2xl font-semibold text-blue-800 mb-2">
            {store.storename}
          </h2>
          <p className="text-gray-700">
            <span className="font-semibold">Email:</span> {store.storemail}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Address:</span> {store.storaddress}
          </p>
          <p className="text-gray-700 mb-4">
            <span className="font-semibold">Average Rating:</span>{" "}
            {store.averageRating || "No ratings yet"}
          </p>

          <h3 className="text-xl font-medium text-gray-800 mb-2">Ratings:</h3>
          <ul className="space-y-4">
            {store.ratings.length ? (
              store.ratings.map((rating) => (
                <li
                  key={rating.id}
                  className="bg-gray-100 p-4 rounded-md shadow-sm"
                >
                  <p className="text-gray-700">
                    <span className="font-semibold">User Name:</span>{" "}
                    {rating.user?.name || "Anonymous"}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">User Email:</span>{" "}
                    {rating.user?.email || "N/A"}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Rating:</span>{" "}
                    {rating.rating}
                  </p>
                </li>
              ))
            ) : (
              <li className="text-gray-500">No ratings yet.</li>
            )}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default StoreOwner;
