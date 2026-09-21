import express from "express";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import authRoutes from "./routes/authRoutes.js"
import authMiddleware from "./middleware/authMiddleware.js";

dotenv.config();

const app = express();

connectDB();

// MIDDLEWARE 
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Employee Management API is running",
  });
});

//rOUTE...........

app.use("/api/auth", authRoutes);

app.use("/api/employees", authMiddleware, employeeRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});