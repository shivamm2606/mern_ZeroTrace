export const validateSecret = (req, res, next) => {
    const { text, viewLimit, expiration } = req.body;

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
        res.status(400);
        const error = new Error('Text content is required and cannot be empty.');
        return next(error);
    }

    if (text.length > 50000) {
        res.status(400);
        return next(new Error('Text content exceeds 50,000 characters.'));
    }

    if (viewLimit && (isNaN(viewLimit) || viewLimit < 1 || viewLimit > 100)) {
        res.status(400);
        return next(new Error('View limit must be between 1 and 100.'));
    }

    if (expiration && (isNaN(expiration) || expiration < 0 || expiration > 10080)) {
        res.status(400);
        return next(new Error('Expiration must be between 0 and 10080 minutes (1 week).'));
    }

    next();
};
