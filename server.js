import express from "express";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import authRoutes from "./routes/authRoutes.js"
import authMiddleware from "./middleware/authMiddleware.js";
import rateLimit from "express-rate-limit";

dotenv.config();

const app = express();

connectDB();

// MIDDLEWARE 
app.use(express.json());


// RATE LIMITER
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // maximum 10 requests
  message: {
    message: "Too many requests, please try again later.",
  },
});


app.get("/", (req, res) => {
  res.json({
    message: "Employee Management API is running",
  });
});

//rOUTE...........

app.use("/api/auth", authRoutes);

app.use("/api/employees", limiter, authMiddleware, employeeRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// Admin
// ├── GET employees       ✅
// ├── POST employee       ✅
// ├── PUT employee        ✅
// └── DELETE employee     ✅

// HR
// ├── GET employees       ✅
// ├── POST employee       ❌
// ├── PUT employee        ❌
// └── DELETE employee     ❌