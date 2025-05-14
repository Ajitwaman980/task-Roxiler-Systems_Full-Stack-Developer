import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Welcome from "./componets/Welcome";
import Signup from "./componets/Signup";
import Login from "./componets/Login";
import Admin from "./componets/Admin";
import StoreOwner from "./componets/StoreOwner";
import User from "./componets/User";
import Adduser from "./pages/admin/Adduser";
import Addadmin from "./pages/admin/Addadmin";
import Addstore from "./pages/admin/Addstore";
const App = () => {
  return (
    <div className=" h-screen w-full bg-gray-300">
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          {/* admin */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/adduser" element={<Adduser />} />
          <Route path="/admin/addadmin" element={<Addadmin />} />
          <Route path="/admin/addstore" element={<Addstore />} />
          {/* user */}
          <Route path="/user" element={<User />} />

          {/* store */}
          <Route path="/store" element={<StoreOwner />} />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
