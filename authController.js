const bcrypt = require('bcryptjs');
const User = require("../models/userModel")

// Signup Function
const signup = async (req, res) => {
    const { Fullname,username,Email,Password } = req.body;
    console.log(req.body);

    try {
        // Check if the username already exists
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already taken' });
        }

        // Hash the password
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



// Login Function
const login = async (req, res) => {
    const { Email, Password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ where: { Email } });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(Password, user.Password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        res.status(200).json({ message: 'Login successful!', user: { id: user.id, Email: user.Email } });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Export Functions
module.exports = { signup, login };

