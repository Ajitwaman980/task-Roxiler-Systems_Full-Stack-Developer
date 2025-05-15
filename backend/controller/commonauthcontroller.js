// controller
import prisma from "../utils/prisma.js";
import bcrypt from "bcryptjs";

import { userSchema } from "../utils/validation.js";
import { tokenGenerator } from "../utils/jwttoken.js";
// Create a new user

export const createUser = async (req, res) => {
  try {
    const { name, email, password, address } = req.body;
    // Validate the request body
    const validationResult = await userSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        error: "Invalid input",
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
      },
    });

    //
    // Generate a JWT token
    const token = await tokenGenerator({ id: user.id, role: user.role });

    if (!token) {
      return res.status(500).json({
        error: "Error generating token",
      });
    }

    // set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "None",
    });

    // response
    res.status(200).json({ message: "User created successfully", user, token });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Error creating user" });
  }
};

// login user

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(400).json({
        error: "User not found",
      });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        error: "Invalid password",
      });
    }

    // Generate a JWT token
    const token = await tokenGenerator({ id: user.id, role: user.role });

    if (!token) {
      return res.status(500).json({
        error: "Error generating token",
      });
    }

    // set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "None",
    });

    // response
    res.status(200).json({
      message: "User logged in successfully",
      user,
      token,
      role: user.role,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Error logging in user" });
  }
};

// logout user

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.error("Error logging out user:", error);
    res.status(500).json({ error: "Error logging out user" });
  }
};

// update password

export const updatePassword = async (req, res) => {
  try {
    const { oldpassword, newpassword } = req.body;

    //  get user

    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
    });

    if (!user) {
      return res.json({
        message: "User not found",
      });
    }
    // compare password

    const isPasswordValid = await bcrypt.compare(oldpassword, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        error: "Invalid password",
      });
    }
    // hash new password
    const hashednewpassword = await bcrypt.hash(newpassword, 10);
    // update password
    const updateduser = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        password: hashednewpassword,
      },
    });
    // response
    res.status(200).json({
      message: "Password updated successfully",
    });
  } catch (error) {
    console.log(error + "Error updating password");
    res.json({
      message: "Error updating password",
    });
  }
};
