import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-xl font-semibold mb-6">
        Welcome to Roxiler Challenge
      </h1>
      <div className="flex space-x-4">
        <Link to="/login">
          <button className="bg-green-400 px-4 py-2 rounded">Login</button>
        </Link>
        <Link to="/signup">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Signup
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
