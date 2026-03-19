import express from "express";
import {
  loginAdmin,
  getStats,
  logoutAdmin,
  checkAuth,
} from "../controllers/adminController.js";
import { verifyJWT } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/login").post(loginAdmin);
router.route("/logout").post(logoutAdmin);
router.route("/stats").get(verifyJWT, getStats);
router.route("/check").get(verifyJWT, checkAuth);

export default router;
