import User from "../models/user.model.js";
import CatchAsync from "../utils/CatchAsync.js";
import ApiError from "../utils/ApiError.js";
import sendResponse from "../utils/ApiResponse.js";
import generateToken from "../utils/GenerateToken.js";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000,
}; 

// register user checked
export const register = CatchAsync(async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(400, "User already exists.");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  const token = generateToken(user._id);

  res.cookie("token", token, cookieOptions);

  return sendResponse(res, 201, "User registered successfully.", {
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    },
  });
});

//login user checked
export const login = CatchAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new ApiError(401, "Invalid credentials.");
  }

  const token = generateToken(user._id);

  res.cookie("token", token, cookieOptions);

  user.password = undefined;

  return sendResponse(res, 200, "Login successful.", user);
});

//logout checked

export const logout = CatchAsync(async (req, res) => {
  res.clearCookie("token");

  return sendResponse(res, 200, "Logged out successfully.");
});


// get user profile checked
export const getProfile = CatchAsync(async (req, res) => {
  return sendResponse(res, 200, "Profile fetched successfully.", req.user);
});
