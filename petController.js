const Pet = require('../models/petModel'); // ✅ Ensure correct import

// 🐾 Add a new pet
exports.addPet = async (req, res) => {
    try {
        console.log("📷 Received file:", req.file); // ✅ Debugging line

        const { name, species, age, breed, description } = req.body;
        const uploadedImageUrl = req.file ? `http://localhost:3000/uploads/${req.file.filename}` : null;

        if (!name || !species || !age || !breed || !description) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const newPet = await Pet.create({
            name,
            species,
            age: Number(age),
            breed,
            description,
            imageUrl: uploadedImageUrl,
        });

        res.status(201).json({ success: true, pet: newPet });
    } catch (error) {
        console.error("Error adding pet:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};



// 🐾 Get all pets
exports.getAllPets = async (req, res) => {
    try {
        const pets = await Pet.findAll();
        res.status(200).json(pets);
    } catch (error) {
        console.error('Error fetching pets:', error);
        res.status(500).json({ error: 'Server error: ' + error.message });
    }
};

// 🐾 Get a single pet by ID
exports.getPetById = async (req, res) => {
    try {
        const pet = await Pet.findByPk(req.params.id);
        if (!pet) {
            return res.status(404).json({ error: 'Pet not found' });
        }
        res.status(200).json(pet);
    } catch (error) {
        res.status(500).json({ error: 'Server error: ' + error.message });
    }
};

// 🐾 Update a pet
exports.updatePet = async (req, res) => {
    try {
        const { name, species, age, breed, description } = req.body;
        const pet = await Pet.findByPk(req.params.id);

        if (!pet) {
            return res.status(404).json({ error: 'Pet not found' });
        }

        await pet.update({ name, species, age, breed, description });

        res.status(200).json({ message: 'Pet updated successfully', pet });
    } catch (error) {
        res.status(500).json({ error: 'Server error: ' + error.message });
    }
};

// 🐾 Delete a pet
exports.deletePet = async (req, res) => {
    try {
        const pet = await Pet.findByPk(req.params.id);
        if (!pet) {
            return res.status(404).json({ error: 'Pet not found' });
        }

        await pet.destroy();
        res.status(200).json({ message: 'Pet deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error: ' + error.message });
    }
};
