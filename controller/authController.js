const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/generateToken");

// Register a new user
const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check if user already exists
    if (name.trim().length < 3) {
      return res
        .status(400)
        .json({ message: "Name must be at least 3 characters long" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "user email already exists" });
    }
    if (password.trim().length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }
    const newUser = new User({ name, email, password });
    await newUser.save();
    const token = generateToken(newUser._id);
    res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict", // Prevent CSRF attacks
        maxAge: 90 * 24 * 60 * 60 * 1000, // 90 days
      })
      .json({ message: "User registered successfully", token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = generateToken(user._id);
    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict", // Prevent CSRF attacks
        maxAge: 90 * 24 * 60 * 60 * 1000, // 90 days
      })
      .json({ message: "Login successfull", token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
const logout = async (req, res) => {
  try {
    return res
      .clearCookie("token", {
        httpOnly: true,
        sameSite: "strict", // Prevent CSRF attacks
      })
      .status(200)
      .json({ message: "Logout successfull" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password -__v -createdAt -updatedAt");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
module.exports = {
  register,
  login,
  logout,
  getCurrentUser
};
