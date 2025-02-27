const express = require("express");
const { getAllUsers, getAllPets, getAllAdoptions } = require("../controllers/adminController");

const router = express.Router();

// ✅ Route to get all users
router.get("/users", getAllUsers);

// ✅ Route to get all pets
router.get("/pets", getAllPets);

// ✅ Route to get all adoption requests
router.get("/adoptions", getAllAdoptions);

module.exports = router;
