// import auth protect routes
import jwt from "jsonwebtoken";

// auth middleware
export const authmiddleware = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ message: "No token found unauthorized" });
    }
    // verify token
    const decodedata = jwt.verify(token, "process.env.JWT_SECRET");
    if (!decodedata) {
      return res.json({ message: "Invalid token" });
    }
    // set user
    req.user = decodedata;
    console.log(req.user);
    next();
  } catch (error) {
    console.error("Error in auth middleware:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
