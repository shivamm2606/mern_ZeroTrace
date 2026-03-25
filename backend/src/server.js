import dotenv from 'dotenv';
dotenv.config(); 

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import errorHandler from './middleware/errorHandler.js';
import secretRoutes from './routes/secretRoutes.js';
import adminRoutes from './routes/adminRoutes.js';


if (!process.env.ENCRYPTION_KEY || process.env.ENCRYPTION_KEY.length !== 32) {
    console.error('ERROR: Missing ENCRYPTION_KEY (Must be 32 characters)');
    process.exit(1); 
}

if (!process.env.MONGO_URI) {
    console.error('ERROR: Missing MONGO_URI');
    process.exit(1);
}

connectDB(); 

const app = express();

app.use(helmet()); 
app.use(cookieParser()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));


app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
}));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
    message: 'Too many requests from this IP please try again later',
});

app.get('/api/health', (req, res) => res.status(200).json({ status: 'ok' }));

app.use('/api', limiter);

app.use('/api/secrets', secretRoutes);
app.use('/api/admin', adminRoutes);


app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
