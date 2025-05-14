import express from "express";
import cookie_parser from "cookie-parser";
import commonauthRoutes from "./routes/commonAuthRouter.js";
import userRoutes from "./routes/userRouter.js";
import storeRoutes from "./routes/storeRouter.js";
import adminRoutes from "./routes/adminRouter.js";
import { rateLimiter } from "./middleware/rate_limit.js";
import cors from "cors";
// port
const PORT = 3000;
// create instance
const app = express();

// test
app.get("/test", (req, res) => {
  res.status(200).json({ message: "Hello World" });
});

// middleware
app.use(express.json());
app.use(cookie_parser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
// routes api

app.use("/api/user/auth", commonauthRoutes); // common auth
app.use("/api/user", userRoutes); // user
app.use("/api/store", storeRoutes); // store
app.use("/api/admin", adminRoutes); // admin

// server run
app.listen(PORT, function () {
  console.log(`Server is running on port ${PORT}`);
});
