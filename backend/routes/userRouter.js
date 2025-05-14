// user router

import express from "express";
import {
  allStore,
  RatingStore,
  modifedRating,
} from "../controller/usercontroller.js";
import { authmiddleware } from "../middleware/auth.js";

const router = express.Router();

// List
router.get("/allstore", authmiddleware, allStore);

// Rate
router.post("/ratingstore/:id", authmiddleware, RatingStore);

// Update
router.put(
  "/update/ratingstore/:storeID/:ratingID",
  authmiddleware,
  modifedRating
);

export default router;
