const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController'); // ✅ Import petController

// 🐾 Fetch all pets
router.get('/', petController.getAllPets);

// 🐾 Add a pet
router.post('/', petController.addPet);

// 🐾 Get a single pet by ID
router.get('/:id', petController.getPetById);

// 🐾 Update a pet by ID
router.put('/pets/:id', petController.updatePet);

// 🐾 Delete a pet by ID
router.delete('/:id', petController.deletePet);

module.exports = router;
