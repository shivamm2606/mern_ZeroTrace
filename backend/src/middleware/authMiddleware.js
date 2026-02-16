import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
    let token;

    if (req.cookies && req.cookies.adminToken) {
        token = req.cookies.adminToken;
    }

    if (!token) {
        res.status(401);
        const error = new Error('Not authorized, no token');
        return next(error);
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = decoded;
        next();
    } catch (error) {
        res.status(401);
        const err = new Error('Not authorized, token failed');
        next(err);
    }
};
