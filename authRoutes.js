const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');  
const authMiddleware = require('../middleware/authMiddleware');
const upload = require("../multerConfig")
// ✅ Signup & Login Routes (No authentication required)
router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.get('/getAllUsers', authController.getAllUsers);

// ✅ User Profile Routes (Requires authentication)
router.get('/get-user-profile/:id', authController.getUserProfile); 
router.put("/update-profile/:id", upload.single("profileImage"), authController.updateUserProfile);



module.exports = router;





