const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
// @desc Register a user
// @route POST /api/user/register
// @access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const userAvailable = await User.findOne({ email: email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already regsitered!");
  }
  
  // Hash Password
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, password: hashedPassword });
  console.log(`User Created Successfully ${user}`);
  if (user) {
    res.status(201).json({ _id: user._id, email: user.email });
  }else{
    res.status(400);
    throw new Error("User data is not valid!");
  }
});

// @desc Login a user
// @route POST /api/user/register
// @access public
const loginUser = asyncHandler(async (req, res) => {
  res.json({ message: "login the user" });
});

// @desc Current user info
// @route GET /api/user/current
// @access private
const currentUser = asyncHandler(async (req, res) => {
  res.json({ message: "current user information" });
});

module.exports = { registerUser, loginUser, currentUser };
