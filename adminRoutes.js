const express = require("express");
const { getAllUsers, getAllPets, getAllAdoptions } = require("../controllers/adminController");

const router = express.Router();


router.get("/users", getAllUsers);


router.get("/pets", getAllPets);
   
router.get("/adoptions", getAllAdoptions);

module.exports = router;
