// admin
import express from "express";
import {
  createAdmin,
  allStore,
  gettingAlluser,
  dashboardSummary,
  getUserById,
  deleteUser,
  deleteStore,
} from "../controller/admincontroller.js";
import { authmiddleware } from "../middleware/auth.js";
import { authorizeRoles } from "../middleware/roleAuth.js";
import { newstore } from "../controller/storecontroller.js";
import { createUser } from "../controller/commonauthcontroller.js";
const router = express.Router();

// new admin
router.post("/newadmin", authmiddleware, authorizeRoles("ADMIN"), createAdmin);

// new user
router.post("/newuser", authmiddleware, authorizeRoles("ADMIN"), createUser);

// new store
router.post("/newstore", authmiddleware, authorizeRoles("ADMIN"), newstore);

// getting the all store list
router.get("/allstore", authmiddleware, authorizeRoles("ADMIN"), allStore);

// getting all user
router.get(
  "/gettingalluser",
  authmiddleware,
  authorizeRoles("ADMIN"),
  gettingAlluser
);

// dashboard give count of user store
router.get(
  "/dashboard",
  authmiddleware,
  authorizeRoles("ADMIN"),
  dashboardSummary
);

// get user by id
router.get(
  "/getuser/:id",
  authmiddleware,
  authorizeRoles("ADMIN"),
  getUserById
);
// delete user
router.delete(
  "/deleteuser/:id",
  authmiddleware,
  authorizeRoles("ADMIN"),
  deleteUser
);
// delete store
router.delete(
  "/deletestore/:id",
  authmiddleware,
  authorizeRoles("ADMIN"),
  deleteStore
);

export default router;
