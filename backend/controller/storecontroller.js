//  stored controller

import prisma from "../utils/prisma.js";
import { storeSchema } from "../utils/validation.js";
// all

// function calculateAverageRating

function calculateAVG(rating) {
  let sum = 0;
  console.log("rating", rating);
  for (let i = 0; i < rating.length; i++) {
    sum = sum + rating[i];
  }
  if (rating.length === 0) return 0;
  return (sum / rating.length).toFixed(2);
}

export const allStoreRatingByid = async (req, res) => {
  try {
    const { id } = req.params;
    const allStore = await prisma.store.findUnique({
      where: {
        id: id,
      },
      include: {
        ratings: {
          include: {
            user: true,
          },
        },
      },
    });

    // store exists
    if (!allStore) {
      return res.status(404).json({
        message: "No store found",
      });
    }

    // avg
    const averageRating = calculateAVG(allStore.ratings.map((r) => r.rating));

    // Check owene
    const userId = req.user.id;
    if (allStore.ownerId !== userId) {
      return res.status(403).json({
        message: "You are not authorized to view this store's ratings",
      });
    }

    res.status(200).json({
      message: "All store",
      allStore,
      averageRating,
    });
  } catch (error) {
    console.error("Error getting all store:", error);
    res.status(500).json({
      message: "Error getting all store",
    });
  }
};

//  new store
export const newstore = async (req, res) => {
  try {
    const { storename, storemail, storaddress, ownerId } = req.body;

    // validate input
    const validationstore = await storeSchema.safeParse(req.body);
    if (!validationstore.success) {
      return res.status(400).json({
        message: "Invalid data",
        errors: validationstore.error.errors,
      });
    }

    // check if storemail already used
    const alreadyExists = await prisma.store.findUnique({
      where: { storemail },
    });

    if (alreadyExists) {
      return res.status(400).json({ message: "Store already exists" });
    }

    // check if provided ownerId exists and is STORE_OWNER
    const owner = await prisma.user.findUnique({
      where: { id: ownerId },
    });

    if (!owner || owner.role !== "STORE_OWNER") {
      return res.status(400).json({ message: "Invalid or non-store owner ID" });
    }

    // create store for that owner
    const store = await prisma.store.create({
      data: {
        storename,
        storemail,
        storaddress,
        ownerId,
      },
    });

    res.status(201).json({
      message: "Store created successfully",
      store,
    });
  } catch (error) {
    console.error("Error creating store:", error);
    res.status(500).json({ message: "Error creating store" });
  }
};

//
//
export const getMyStore = async (req, res) => {
  try {
    const userId = req.user.id;

    const stores = await prisma.store.findMany({
      where: {
        ownerId: userId,
      },
      include: {
        ratings: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!stores || stores.length === 0) {
      return res.status(404).json({ message: "No store found for this user" });
    }

    // Add average rating for each store
    const storesWithAvg = stores.map((store) => {
      const ratings = store.ratings.map((r) => r.rating);
      const averageRating = calculateAVG(ratings);
      return {
        ...store,
        averageRating,
      };
    });

    res.status(200).json({
      message: "Stores fetched successfully",
      stores: storesWithAvg,
    });
  } catch (error) {
    console.error("Error fetching store:", error);
    res.status(500).json({ message: "Error fetching store" });
  }
};
