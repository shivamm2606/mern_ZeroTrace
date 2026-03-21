import jwt from "jsonwebtoken";
import Secret from "../models/Secret.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  maxAge: 3600000,
};

export const loginAdmin = asyncHandler(async (req, res) => {
  const { password } = req.body;

  // Simple hardcoded check
  if (password !== process.env.ADMIN_PASSWORD) {
    res.status(401);
    throw new Error("Wrong password!");
  }

  const token = generateToken("admin");

  res.cookie("adminToken", token, cookieOptions).json({
    success: true,
    message: "Admin logged in successfully",
  });
});

export const getStats = asyncHandler(async (req, res) => {
  const secretCount = await Secret.countDocuments();
  res.json({
    success: true,
    activeSecrets: secretCount,
  });
});

export const logoutAdmin = asyncHandler(async (req, res) => {
  res
    .status(200)
    .clearCookie("adminToken", { httpOnly: true, secure: true })
    .json({ success: true, message: "Logged out" });
});

export const checkAuth = asyncHandler(async (req, res) => {
  res.status(200).json({ success: true, isAdmin: true });
});
