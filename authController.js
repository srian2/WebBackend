const bcrypt = require('bcryptjs');
const User = require("../models/userModel")
const jwt = require('jsonwebtoken');
require('dotenv').config();
// Signup Function
exports.signup = async (req, res) => {
    try {
        console.log('Request Body:', req.body);

        const { Fullname,username, Email, Password } = req.body;

        if (!Fullname| !username || !Email || !Password) {
            return res.status(400).json({ error: ' Fullname, Username, email, and password are required' });
        }
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already taken' });
        }

        const hashedPassword = await bcrypt.hash(Password, 10);
        // Save the user to the database
        await User.create({
            Fullname,
            username,
            Email,
            Password: hashedPassword, // Ensure hashed password is stored
        });
        res.status(201).json({ message: 'User signed up successfully!' });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
// Login function
exports.login = async (req, res) => {
    try {
        const { Email, Password } = req.body;
        console.log("Login Request Body:", req.body);

        if (!Email || !Password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const user = await User.findOne({ where: { Email } });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(Password, user.Password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const secretKey = process.env.JWT_SECRET || 'default_secret_key';

        const token = jwt.sign({ id: user.id, Email: user.Email }, secretKey, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error during login:',error);
        res.status(500).json({ error: 'Error logging in.' });
    }
};



