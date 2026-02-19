import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import errorHandler from './middleware/errorHandler.js';
import secretRoutes from './routes/secretRoutes.js';
import adminRoutes from './routes/adminRoutes.js';


// 1. Check Environment Variables
// We need to make sure the app has the keys it needs to work securely.
if (!process.env.ENCRYPTION_KEY || process.env.ENCRYPTION_KEY.length !== 32) {
    console.error('ERROR: Missing ENCRYPTION_KEY (Must be 32 characters)');
    process.exit(1); // Stop the server if config is wrong
}

if (!process.env.MONGO_URI) {
    console.error('ERROR: Missing MONGO_URI');
    process.exit(1);
}

connectDB(); // 2. Connect to Database

const app = express();

// 3. Middlewares (Helpers)
app.use(helmet()); // strict security headers
app.use(cookieParser()); // lets us read cookies
app.use(express.json()); // lets us read JSON from the body
app.use(express.urlencoded({ extended: false }));

// Allow the frontend to talk to this backend (CORS)
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
}));

// Limit repeated requests to prevent abuse
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later',
});

app.use('/api', limiter);

// 4. Routes
app.use('/api/secrets', secretRoutes);
app.use('/api/admin', adminRoutes);

// Global Error Handler (Catches any errors in routes)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
