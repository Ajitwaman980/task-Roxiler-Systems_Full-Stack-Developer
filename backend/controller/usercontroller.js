// user controller

import prisma from "../utils/prisma.js";

//  getting list of all stored

export const allStore = async (req, res) => {
  try {
    const allStore = await prisma.store.findMany({
      include: {
        ratings: {
          include: {
            user: true,
          },
        },
      },
    });

    // not
    if (!allStore) {
      return res.status(404).json({
        message: "No store found",
      });
    }
    res.status(200).json({
      message: "All store",
      allStore,
    });
  } catch (error) {
    console.error("Error getting all store:", error);
    res.status(500).json({
      message: "Error getting all store",
    });
  }
};

// serch by name or address

export const searchStore = async (req, res) => {
  try {
    const { name, address } = req.query;

    // check if name or address is provided
    if (!name && !address) {
      return res.status(400).json({
        message: "Please provide a name or address to search",
      });
    }

    // search store
    const store = await prisma.store.findMany({
      where: {
        OR: [
          {
            name: {
              contains: name,
            },
          },
          {
            address: {
              contains: address,
            },
          },
        ],
      },
    });

    // not found
    if (!store) {
      return res.status(404).json({
        message: "No store found",
      });
    }
    res.status(200).json({
      message: "Store found",
      store,
    });
  } catch (error) {
    console.error("Error searching store:", error);
    res.status(500).json({
      message: "Error searching store",
    });
  }
};

// new rating user stored

export const RatingStore = async (req, res) => {
  try {
    const { rating } = req.body;
    const { id } = req.params;

    const store = await prisma.store.findUnique({
      where: {
        id: id,
      },
    });
    if (!store) {
      return res.status(404).json({
        message: "Store not found",
      });
    }
    // rating
    const newRating = await prisma.rating.create({
      data: {
        rating: rating,
        storeId: id,
        userId: req.user.id,
      },
    });

    res.status(201).json({
      message: "Store rated successfully",
      newRating,
    });
  } catch (error) {
    console.error("Error rating store:", error);
    res.status(500).json({
      message: "Error rating store",
    });
  }
};

export const modifedRating = async (req, res) => {
  try {
    const { storeID, ratingID } = req.params;
    const { rating } = req.body;

    const userid = req.user.id;
    // console.log("userid", userid);
    // console.log("storeID", storeID);

    const ratingStore = await prisma.rating.findUnique({
      where: {
        id: ratingID,
      },
    });

    if (!ratingStore) {
      return res.status(404).json({
        message: "Rating not found",
      });
    }

    const updateRating = await prisma.rating.update({
      where: {
        id: ratingID,
      },
      data: {
        rating: rating,
      },
    });

    res.status(200).json({
      message: "Rating updated successfully",
      updateRating,
    });
  } catch (error) {
    console.error("Error updating rating:", error);
    res.status(500).json({
      message: "Error updating rating",
    });
  }
};
