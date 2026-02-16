import express from 'express';
import { loginAdmin, getStats, logoutAdmin, checkAuth } from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', loginAdmin);
router.post('/logout', logoutAdmin);
router.get('/stats', protect, getStats);
router.get('/check', protect, checkAuth);

export default router;
