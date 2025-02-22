const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config();

// ✅ User Signup (Register)
exports.signup = async (req, res) => {
    try {
        console.log("Signup Request Body:", req.body);

        const { Fullname, username, Email, Password } = req.body;

        // ✅ Validate required fields
        if (!Fullname || !username || !Email || !Password) {
            return res.status(400).json({ error: "Fullname, username, email, and password are required" });
        }

        // ✅ Check if username or email already exists
        const existingUser = await User.findOne({ where: { Email } });
        if (existingUser) {
            return res.status(400).json({ error: "Email already registered" });
        }

        // ✅ Hash password before storing
        const hashedPassword = await bcrypt.hash(Password, 10);

        // ✅ Create new user
        await User.create({
            Fullname,
            username,
            Email,
            Password: hashedPassword, // Store hashed password
        });

        res.status(201).json({ message: "User signed up successfully!" });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
};

// ✅ User Login
exports.login = async (req, res) => {
    try {
        const { Email, Password } = req.body;
        console.log("Login Request Body:", req.body);

        // ✅ Check if fields are filled
        if (!Email || !Password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        // ✅ Find user by email
        const user = await User.findOne({ where: { Email } });
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // ✅ Compare hashed passwords
        const isPasswordValid = await bcrypt.compare(Password, user.Password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // ✅ Generate JWT Token
        const token = jwt.sign({ id: user.id, email: user.Email }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
};
exports.getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Get user ID from token
        const user = await User.findByPk(userId, { attributes: ['id', 'Fullname', 'Email'] });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.updateUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;  // Get user ID from middleware
        const { Fullname, Email, Password } = req.body;  // Extract data from request

        // Find user in the database
        let user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update user fields
        if (Fullname) user.Fullname = Fullname;
        if (Email) user.Email = Email;
        if (Password) user.Password = Password;

        await user.save();  // Save changes

        res.status(200).json({ message: "Profile updated successfully", user });
    } catch (error) {
        console.error("Update Profile Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};


