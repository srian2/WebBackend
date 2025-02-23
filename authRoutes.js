const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');  // ✅ Ensure correct path
const authMiddleware = require('../middleware/authMiddleware');  // ✅ Ensure middleware is imported

// ✅ Signup & Login Routes (No authentication required)
router.post('/signup', authController.signup);
router.post('/login', authController.login);

// ✅ User Profile Routes (Requires authentication)
router.get('/profile', authMiddleware, authController.getUserProfile); // 🔥 Ensure function exists
router.put('/profile', authMiddleware, authController.updateUserProfile); // 🔥 Ensure function exists

module.exports = router;





