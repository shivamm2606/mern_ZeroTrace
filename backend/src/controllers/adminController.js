import jwt from 'jsonwebtoken';
import Secret from '../models/Secret.js';

// Helper to make a JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
};

// Login function
export const loginAdmin = async (req, res, next) => {
    try {
        const { password } = req.body;

        // Step 1: Check the password (Simple hardcoded check)
        if (password === process.env.ADMIN_PASSWORD) {

            // Step 2: Create a token so they stay logged in
            const token = generateToken('admin');

            // Step 3: Save token in a HTTP-only cookie
            // This is safer than localStorage because JS can't read it
            res.cookie('adminToken', token, {
                httpOnly: true,
                secure: true, // Always true for cross-site (requires HTTPS)
                sameSite: 'none', // Allow cross-site
                maxAge: 3600000, // 1 hour
            });

            res.json({
                success: true,
                message: 'Admin logged in successfully',
            });

        } else {
            res.status(401);
            throw new Error('Wrong password');
        }
    } catch (error) {
        next(error);
    }
};

// Get Dashboard Stats
export const getStats = async (req, res, next) => {
    try {
        // Count how many secrets are currently in the database
        const secretCount = await Secret.countDocuments();

        res.json({
            success: true,
            activeSecrets: secretCount,
        });
    } catch (error) {
        next(error);
    }
};

// Logout
export const logoutAdmin = (req, res) => {
    // Clear the cookie by setting it to expire instantly
    res.cookie('adminToken', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.json({ success: true, message: 'Logged out' });
};

// Simple check to see if user is logged in
export const checkAuth = (req, res) => {
    res.json({ success: true, isAdmin: true });
};
