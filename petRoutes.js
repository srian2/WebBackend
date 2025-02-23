const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController'); 
const upload = require("../multerConfig"); 

// 🐾 Fetch all pets
router.get("/", petController.getAllPets); 

// 🐾 Add a pet
router.post("/", upload.single("image"), petController.addPet);

// 🐾 Get a single pet by ID
router.get('/:id', petController.getPetById);

// 🐾 Delete a pet by full details (not ID)
router.post('/delete', petController.deletePet); // ✅ Change DELETE to POST


module.exports = router;

