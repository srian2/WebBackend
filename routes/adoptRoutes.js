const express = require("express");
const router = express.Router();
const Adoption = require("../models/adoption");
const adoptionController = require("../controllers/adoptionController");


// 📌 POST: Submit Adoption Request
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, address, petName, reason } = req.body;

    if (!name || !email || !phone || !address || !petName || !reason) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newAdoption = await Adoption.create({
      name,
      email,
      phone,
      address,
      petName,
      reason,
    });

    res.status(201).json({ message: "Adoption request submitted", adoption: newAdoption });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

// 📌 GET: Get All Adoption Requests
router.get("/getAdoptions", adoptionController.getAllAdoptions);
router.put("/updateStatus/:id", adoptionController.updateAdoptionStatus);


module.exports = router;
