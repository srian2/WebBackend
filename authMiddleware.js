const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const authHeader = req.header("Authorization");
    try {
        // 🔓 Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user details from token

        next(); // 🚀 Proceed to the next middleware or route handler
    } catch (error) {
        console.error("🚨 Invalid token:", error.message);

        let errorMessage = "Invalid token";
        if (error.name === "TokenExpiredError") {
            errorMessage = "Token has expired. Please log in again.";
        } else if (error.name === "JsonWebTokenError") {
            errorMessage = "Invalid token. Authentication failed.";
        }

        res.status(401).json({ error: errorMessage });
    }
};





