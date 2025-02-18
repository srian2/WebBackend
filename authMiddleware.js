const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET ); // Use env variable or default fallback
        const user = await User.findByPk(decoded.id);

        if (!user) {
            return res.status(401).json({ error: 'Invalid token. User not found.' });
        }

        req.user = user; // Attach user to request
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Invalid or expired token' });
    }
};

module.exports = authMiddleware;

