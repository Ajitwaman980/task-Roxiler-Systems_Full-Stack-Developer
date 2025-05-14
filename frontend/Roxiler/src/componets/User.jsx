import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const User = () => {
  const [stores, setStores] = useState([]);
  const [ratings, setRatings] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/user/allstore", {
          withCredentials: true,
        });
        setStores(res.data.allStore);
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };
    fetchStores();
  }, []);

  const handleInputChange = (storeId, value) => {
    setRatings((prev) => ({
      ...prev,
      [storeId]: value,
    }));
  };

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3000/api/user/auth/logout", {
        withCredentials: true,
      });
      alert("Logged out successfully");
      navigate("/login");
    } catch (err) {
      console.error("Logout error", err);
      alert("Logout failed");
    }
  };

  const handleRatingSubmit = async (storeId) => {
    const ratingValue = parseInt(ratings[storeId]);
    try {
      const res = await axios.post(
        `http://localhost:3000/api/user/ratingstore/${storeId}`,
        { rating: ratingValue },
        { withCredentials: true }
      );
      if (res.status === 201) {
        alert("Rating submitted successfully.");
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
      alert("Failed to submit rating.");
    }
  };

  // handle the edit of the rating
  const handleEditRating = async (storeId, ratingId) => {
    const ratingValue = parseInt(ratings[storeId]);
    try {
      const res = await axios.put(
        `http://localhost:3000/api/user/update/ratingstore/${storeId}/${ratingId}`,
        { rating: ratingValue },
        { withCredentials: true }
      );
      if (res.status === 200) {
        alert("Rating updated successfully.");
      }
    } catch (error) {
      console.error("Error updating rating:", error);
      alert("Failed to update rating.");
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="bg-gray-800 text-white p-6 mb-6 flex justify-between items-center rounded-md shadow-lg">
        <h1 className="font-bold text-3xl">Store Listings</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white text-lg"
        >
          Logout
        </button>
      </div>

      {stores.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stores.map((store) => (
            <div
              key={store.id}
              className="bg-white shadow-xl rounded-xl p-6 w-full"
            >
              <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">
                {store.storename}
              </h1>
              <p className="text-gray-700 mb-2">
                <strong>Address:</strong> {store.storaddress}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Email:</strong> {store.storemail}
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Overall Rating:</strong>{" "}
                {store.ratings?.length
                  ? (
                      store.ratings.reduce((a, b) => a + b.rating, 0) /
                      store.ratings.length
                    ).toFixed(1)
                  : "No ratings"}
              </p>

              <p className="text-gray-700 mb-2 font-semibold">All Ratings:</p>
              {store.ratings?.length > 0 ? (
                <ul className="list-disc ml-5 text-sm text-gray-800 mb-4">
                  {store.ratings.map((rating) => (
                    <li key={rating.id}>
                      <strong>User {rating.user.name}: </strong>
                      {rating.rating}{" "}
                      <button
                        onClick={() => handleEditRating(store.id, rating.id)}
                        className="bg-green-500 text-white px-3 py-1 rounded ml-2 text-xs"
                      >
                        Edit Rating
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm">
                  No individual ratings yet.
                </p>
              )}

              {/* Rating input per store */}
              <div className="mt-4">
                <label className="block mb-2 text-gray-600 font-semibold">
                  Your Rating (1-5):
                </label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={ratings[store.id] || ""}
                  onChange={(e) => handleInputChange(store.id, e.target.value)}
                  className="block w-full p-3 border border-gray-300 rounded-md text-lg mb-4"
                />
                <button
                  onClick={() => handleRatingSubmit(store.id)}
                  className="bg-blue-500 text-white px-6 py-2 mt-4 rounded-full w-full"
                >
                  Submit Rating
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No stores found.</p>
      )}
    </div>
  );
};

export default User;
