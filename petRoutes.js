const express = require('express');
const router = express.Router();
const Pet = require('../models/petModel');  // Correct model path

// Create a new pet
router.post('/pets', async (req, res) => {
    try {
        const { name, species, age, breed, description, image } = req.body;
        const newPet = await Pet.create({ name, species, age, breed, description, image });

        res.status(201).json({ message: 'Pet added successfully', pet: newPet });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error adding pet' });
    }
});

module.exports = router;

