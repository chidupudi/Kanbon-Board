require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");
const crypto = require("crypto"); // For custom token generation

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "http://localhost:3000" })); // Allow requests from React frontend
app.use(bodyParser.json());

// MongoDB connection
const DB_URI = process.env.MONGO_URI;
mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// User Schema and Model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

// Custom Token Generator
const generateCustomToken = () => {
  return crypto.randomBytes(10).toString("hex").substring(0, 10); // 10 characters
};

// Routes

// Signup Route
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "User with this email already exists." });
    }
    res.status(500).json({ message: "Server error", error });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Custom JWT token with a fixed length of 10 characters
    const token = generateCustomToken();

    res.status(200).json({
      message: "Login successful.",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Protected Route Example
app.get("/protected", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided." });
  }

  // This is an example route, so it only checks the format of the custom token
  if (token.length !== 10) {
    return res.status(401).json({ message: "Invalid token." });
  }

  res.status(200).json({ message: "Access granted.", token });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
