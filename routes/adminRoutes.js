const express = require("express");
const { addOrUpdatePet,getAllUsers, getAllPets, getAllAdoptions } = require("../controllers/adminController");
const router = express.Router();


router.post("/pets/add", addOrUpdatePet);

router.get("/users", getAllUsers);


router.get("/pets", getAllPets);

router.get("/adoptions", getAllAdoptions);



module.exports = router;
