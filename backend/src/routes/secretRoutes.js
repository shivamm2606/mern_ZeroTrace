import express from 'express';
import { createSecret, getSecret } from '../controllers/secretController.js';
import { validateSecret } from '../middleware/validate.js';

const router = express.Router();

router.route('/').post(validateSecret, createSecret);

router.route('/:id').get(getSecret);

export default router;backend/src/routes/secretRoutes.js
