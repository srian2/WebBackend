const User = require("../models/userModel");
const Pet = require("../models/petModel");
const Adoption = require("../models/adoption");

// ✅ Get all users
const getAllUsers = async (req, res) => {
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
const getAllPets = async (req, res) => {
    try {
        const pets = await Pet.findAll();
        res.status(200).json(pets);
    } catch (error) {
        console.error("Error fetching pets:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// ✅ Get all adoption requests
const getAllAdoptions = async (req, res) => {
    try {
        const adoptions = await Adoption.findAll();
        res.status(200).json(adoptions);
    } catch (error) {
        console.error("Error fetching adoptions:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// ✅ Add or Update Pet if name & species match
const addOrUpdatePet = async (req, res) => {
    try {
        const { name, species, age, breed, description } = req.body;
        const image = req.file ? req.file.path : null;

        // Check if a pet with the same name and species exists
        let pet = await Pet.findOne({ where: { name, species } });

        if (pet) {
            // Update existing pet
            await pet.update({ age, breed, description, image });
            return res.status(200).json({ message: "Pet updated successfully", pet });
        } else {
            // Create new pet
            pet = await Pet.create({ name, species, age, breed, description, image });
            return res.status(201).json({ message: "Pet added successfully", pet });
        }
    } catch (error) {
        console.error("Error adding/updating pet:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// ✅ Export all functions properly
module.exports = { addOrUpdatePet, getAllUsers, getAllPets, getAllAdoptions };
