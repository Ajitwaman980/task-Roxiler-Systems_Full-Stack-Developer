// system admin controller
// do - > 1 new store 2 new admin 3 new user
import prisma from "../utils/prisma.js";
import { userSchema } from "../utils/validation.js";
import bcrypt from "bcryptjs";
// new user
export const createAdmin = async (req, res) => {
  try {
    const { name, email, password, address } = req.body;
    // Validate the request body
    const validationResult = await userSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        error: "Invalid input validation",
      });
    }
    // Check if the user already exists
    const alreadyExists = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (alreadyExists) {
      return res.status(400).json({
        error: "User already exists",
      });
    }
    // hash passwored using bcrypt
    const hashedpassowrd = await bcrypt.hash(password, 10);
    // Create a new user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedpassowrd,
        address,
        role: "ADMIN",
      },
    });
    // response
    res.status(201).json({
      message: "Admin created successfully",
      user,
    });
  } catch (error) {
    console.error("Error creating admin:", error);
    res.status(500).json({
      message: "Error creating admin",
    });
  }
};

// all stores

export const allStore = async (req, res) => {
  try {
    const allstores = await prisma.store.findMany({
      include: {
        ratings: {
          include: {
            user: true,
          },
        },
      },
    });
    if (!allstores) {
      return res.status(404).json({
        message: "No stores found",
      });
    }

    res.status(200).json({
      message: "All stores",
      allstores,
    });
  } catch (error) {
    console.error("Error getting all stores:", error);
    res.status(500).json({
      message: "Error getting all stores",
    });
  }
};

// all user

export const gettingAlluser = async (req, res) => {
  try {
    const alluser = await prisma.user.findMany();
    if (!alluser) {
      return res.status(404).json({
        message: "No user found",
      });
    }
    res.status(200).json({
      message: "All user",
      alluser,
    });
  } catch (error) {
    console.error("Error getting all user:", error);
    res.status(500).json({
      message: "Error getting all user",
    });
  }
};

export const dashboardSummary = async (req, res) => {
  try {
    const totalUsers = await prisma.user.count();
    const totalStores = await prisma.store.count();
    const totalRatings = await prisma.rating.count();

    res.status(200).json({ totalUsers, totalStores, totalRatings });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ error: "Failed to fetch dashboard summary" });
  }
};

//  get element by id use
export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

// delete user
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.delete({
      where: { id },
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};

//  delete store
export const deleteStore = async (req, res) => {
  const { id } = req.params;
  try {
    const store = await prisma.store.delete({
      where: { id },
    });

    if (!store) return res.status(404).json({ message: "Store not found" });

    res.json({ message: "Store deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete store" });
  }
};
