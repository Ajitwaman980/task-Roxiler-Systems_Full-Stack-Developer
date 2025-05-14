// user routes

import express from "express";
const router = express.Router();

import {
  createUser,
  logoutUser,
  loginUser,
  updatePassword,
} from "../controller/commonauthcontroller.js";
import { authmiddleware } from "../middleware/auth.js";

// Auth
// Signup
router.post("/signup", createUser);
// Login
router.post("/login", loginUser);
// Logout
router.get("/logout", authmiddleware, logoutUser);
// Update
router.put("/updatepassword", authmiddleware, updatePassword);

export default router;
