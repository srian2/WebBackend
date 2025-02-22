const Adoption = require("../models/adoption");

// 📌 Submit Adoption Request
exports.submitAdoption = async (req, res) => {
  try {
    console.log("📢 Received adoption request:", req.body); // Log request data

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

    console.log("✅ Adoption request saved:", newAdoption); // Log successful entry

    res.status(201).json({ message: "Adoption request submitted", adoption: newAdoption });
  } catch (error) {
    console.error("🚨 Server Error:", error.message); // Log the actual error
    res.status(500).json({ error: "Server error", details: error.message });
  }
};


// 📌 Update Adoption Status (Admin)
exports.updateAdoptionStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    if (!["Pending", "Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const adoption = await Adoption.findByPk(id);
    if (!adoption) {
      return res.status(404).json({ error: "Adoption request not found" });
    }

    adoption.status = status;
    await adoption.save();

    res.json({ message: "Adoption status updated", adoption });
  } catch (error) {
    res.status(500).json({ error: "Error updating adoption request" });
  }
};
