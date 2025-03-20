const Adoption = require("../models/adoption");
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
    })
    console.log("✅ Adoption request saved:", newAdoption); 
    res.status(201).json({ message: "Adoption request submitted", adoption: newAdoption });
  } catch (error) {
    console.error("🚨 Server Error:", error.message); 
    res.status(500).json({ error: "Server error", details: error.message });
  }
};
exports.updateAdoptionStatus = async (req, res) => {
  try {
      const { id } = req.params; 
      const { status } = req.body; 
      if (!status) {
          return res.status(400).json({ message: "Status is required" });
      }

      const adoption = await Adoption.findByPk(id);
      if (!adoption) {
          return res.status(404).json({ message: "Adoption request not found" });
      }
      adoption.status = status;
      await adoption.save();
      res.status(200).json({ message: "Status updated successfully", adoption });
  } catch (error) {
      console.error("Error updating adoption status:", error);
      res.status(500).json({ message: "Server error" });
  }
};
exports.getAllAdoptions = async (req, res) => {
  try {
    const adoptions = await Adoption.findAll(); // Fetch all adoption requests
    res.status(200).json({ adoptions });
  } catch (error) {
    console.error("🚨 Error fetching adoptions:", error.message);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};






