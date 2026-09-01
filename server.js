const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Routes Import
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes"); // 1. Import check karein

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("AURA Luxury API is running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes); 

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});