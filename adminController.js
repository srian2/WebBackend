const User = require("../models/userModel");
const Pet = require("../models/petModel");
const Adoption = require("../models/adoption");

// ✅ Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ["id", "Fullname", "Email", "dob", "address", "phoneNumber", "photo"]
        });
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// ✅ Get all pets
exports.getAllPets = async (req, res) => {
    try {
        const pets = await Pet.findAll();
        res.status(200).json(pets);
    } catch (error) {
        console.error("Error fetching pets:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// ✅ Get all adoption requests
exports.getAllAdoptions = async (req, res) => {
    try {
        const adoptions = await Adoption.findAll();
        res.status(200).json(adoptions);
    } catch (error) {
        console.error("Error fetching adoptions:", error);
        res.status(500).json({ message: "Server error" });
    }
};
