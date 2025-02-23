const express = require("express");
const router = express.Router();
const Adoption = require("../models/adoption");

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

module.exports = router;

