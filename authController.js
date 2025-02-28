const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config();
exports.signup = async (req, res) => {
    try {
        console.log("Signup Request Body:", req.body);
        const { Fullname, Email, Password } = req.body;
        if (!Fullname  || !Email || !Password) {
            return res.status(400).json({ error: "Fullname, username, email, and password are required" });
        }
        const existingUser = await User.findOne({ where: { Email } });
        if (existingUser) {
            return res.status(400).json({ error: "Email already registered" });
        }
        const hashedPassword = await bcrypt.hash(Password, 10);
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
exports.login = async (req, res) => {
    try {
        const { Email, Password } = req.body;
        console.log("Login Request Body:", req.body);
        if (!Email || !Password) {
            return res.status(400).json({ error: "Email and password are required" });
        }
        if (Email === "admin@example.com" && Password === "admin123") {
            const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1h" });
            return res.status(200).json({ message: "Admin login successful", token, role: "admin" });
        }
        const user = await User.findOne({ where: { Email } });
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }
        const isPasswordValid = await bcrypt.compare(Password, user.Password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Invalid email or password" });
        }
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
exports.updateUserProfile = async (req, res) => {
    try {
        const userId = req.params.id; 
        const { Fullname, Email, Password, dob, address, phoneNumber } = req.body;
        let user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (Fullname) user.Fullname = Fullname;
        if (Email) user.Email = Email;
        if (dob) user.dob = dob;
        if (address) user.address = address;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (Password) {
            user.Password = await bcrypt.hash(Password, 10);
        }
        if (req.file) {
            user.photo = `${req.protocol}://${req.get("host")}/${req.file.path}`; 
        }
        await user.save();

        res.status(200).json({ message: "Profile updated successfully", user });
    } catch (error) {
        console.error("Update Profile Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'Fullname', 'Email', 'dob', 'phoneNumber', 'address', 'photo']
        });
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Server error" });
    }
};




