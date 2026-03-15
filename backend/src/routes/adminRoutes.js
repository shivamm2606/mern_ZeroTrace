import express from "express";
import {
  loginAdmin,
  getStats,
  logoutAdmin,
  checkAuth,
} from "../controllers/adminController.js";
import { verifyJWT } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);
router.get("/stats", verifyJWT, getStats);
router.get("/check", verifyJWT, checkAuth);

export default router;
