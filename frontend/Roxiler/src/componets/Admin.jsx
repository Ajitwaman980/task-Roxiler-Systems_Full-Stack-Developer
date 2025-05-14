import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [summary, setSummary] = useState({});
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboard();
    alluserFecth();
    fetchStores();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/admin/dashboard", {
        withCredentials: true,
      });
      setSummary(res.data);
    } catch (err) {
      console.error("Dashboard fetch error", err);
    }
  };

  const alluserFecth = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/admin/gettingalluser",
        {
          withCredentials: true,
        }
      );
      setUsers(res.data.alluser);
    } catch (err) {
      console.error("Users fetch error", err);
    }
  };

  const fetchStores = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/admin/allstore", {
        withCredentials: true,
      });
      setStores(res.data.allstores);
    } catch (err) {
      console.error("Stores fetch error", err);
    }
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

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/admin/deleteuser/${id}`, {
        withCredentials: true,
      });
      alert("User deleted successfully");
      alluserFecth(); // Refresh users list
    } catch (err) {
      console.error("Delete user error", err);
      alert("Failed to delete user");
    }
  };

  const deleteStore = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/admin/deletestore/${id}`, {
        withCredentials: true,
      });
      alert("Store deleted successfully");
      fetchStores(); // Refresh stores list
    } catch (err) {
      console.error("Delete store error", err);
      alert("Failed to delete store");
    }
  };

  return (
    <div className="h-screen w-full bg-gray-100">
      <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <h1 className="font-bold text-3xl">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white"
        >
          Logout
        </button>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold">Total Users</h2>
          <p className="text-2xl">{summary.totalUsers || 0}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold">Total Stores</h2>
          <p className="text-2xl">{summary.totalStores || 0}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold">Total rating </h2>
          <p className="text-2xl">{summary.totalRatings}</p>
        </div>
      </div>

      {/* Add new user/admin/store */}
      <div className="p-4 flex justify-evenly bg-gray-200 rounded mb-4">
        <div>
          <h2 className="text-2xl font-semibold mb-3">Add New User</h2>
          <Link to={"/admin/adduser"}>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-2 rounded">
              Add User
            </button>
          </Link>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-3">Add New Admin</h2>
          <Link to={"/admin/addadmin"}>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-2 rounded">
              Add Admin
            </button>
          </Link>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-3">Add New Store</h2>
          <Link to={"/admin/addstore"}>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-2 rounded">
              Add Store
            </button>
          </Link>
        </div>
      </div>

      {/* Users Table */}
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">All Users</h2>
        <div className="overflow-auto max-h-60 border rounded bg-white">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">Sr NO</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id || index} className="border-t">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.role}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stores Table */}
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">All Stores</h2>
        <div className="overflow-auto max-h-60 border rounded bg-white">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">Sr NO</th>
                <th className="px-4 py-2">Store Name</th>
                <th className="px-4 py-2">Address</th>
                <th className="px-4 py-2">Rating</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {stores.map((store, index) => (
                <tr key={store.id || index} className="border-t">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{store.storename}</td>
                  <td className="px-4 py-2">{store.storaddress}</td>
                  <td className="px-4 py-2">{store.ratings.length}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => deleteStore(store.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
