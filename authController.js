const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config();

// ✅ User Signup (Register)
exports.signup = async (req, res) => {
    try {
        console.log("Signup Request Body:", req.body);

        const { Fullname, Email, Password } = req.body;

        // ✅ Validate required fields
        if (!Fullname  || !Email || !Password) {
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

        // ✅ Check if admin login
        if (Email === "admin@example.com" && Password === "admin123") {
            const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1h" });
            return res.status(200).json({ message: "Admin login successful", token, role: "admin" });
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
        const token = jwt.sign({ userId: user.id, role: "user" }, process.env.JWT_SECRET, { expiresIn: "1h" });

        console.log("Generated Token:", token);

        res.status(200).json({ message: "User login successful", token, role: "user" });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
};

// ✅ Get User Profile
exports.getUserProfile = async (req, res) => {
    try {
        const userId = req.params.id; // Get user ID from token
        const user = await User.findByPk(userId, { attributes: ['id', 'Fullname', "dob",'phoneNumber','address','photo','Email'] });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// ✅ Update User Profile


exports.updateUserProfile = async (req, res) => {
    try {
        const userId = req.params.id; // ✅ Get user ID from URL parameter
        const { Fullname, Email, Password, dob, address, phoneNumber } = req.body;

        // Find user by ID
        let user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // ✅ Update only provided fields
        if (Fullname) user.Fullname = Fullname;
        if (Email) user.Email = Email;
        if (dob) user.dob = dob;
        if (address) user.address = address;
        if (phoneNumber) user.phoneNumber = phoneNumber;

        // ✅ Handle password update securely
        if (Password) {
            user.Password = await bcrypt.hash(Password, 10);
        }

        // ✅ Handle profile photo update (if file is uploaded)
        if (req.file) {
            user.photo = `${req.protocol}://${req.get("host")}/${req.file.path}`; 
        }

        // Save changes to the database
        await user.save();

        res.status(200).json({ message: "Profile updated successfully", user });
    } catch (error) {
        console.error("Update Profile Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

