// router

import express from "express";
import {
  allStoreRatingByid,
  newstore,
  getMyStore,
} from "../controller/storecontroller.js";
import { authmiddleware } from "../middleware/auth.js";
import { authorizeRoles } from "../middleware/roleAuth.js";
const router = express.Router();

// getting the all store list
router.get(
  "/allstoreRating/:id",
  authmiddleware,
  authorizeRoles("STORE_OWNER"),
  allStoreRatingByid
);

//  new store
router.post("/newstore", authmiddleware, authorizeRoles("ADMIN"), newstore);

// / my store
router.get(
  "/my-store",
  authmiddleware,
  authorizeRoles("STORE_OWNER"),
  getMyStore
);
export default router;
