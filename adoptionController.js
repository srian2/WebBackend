const Adoption = require('../models/adoption');
const User = require('../models/User');
const Pet = require('../models/Pet');

// Create an adoption request
exports.createAdoptionRequest = async (req, res) => {
    try {
        const { petId, message } = req.body;
        const userId = req.user.id;

        const adoption = await Adoption.create({ userId, petId, message });
        res.status(201).json({ success: true, data: adoption });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error });
    }
};

// Get all adoption requests (Admin Only)
exports.getAdoptionRequests = async (req, res) => {
    try {
        const requests = await Adoption.findAll({
            include: [{ model: User, attributes: ['Fullname', 'Email'] }, { model: Pet, attributes: ['name', 'breed'] }]
        });
        res.status(200).json({ success: true, data: requests });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error });
    }
};

// Update adoption request status (Admin Only)
exports.updateAdoptionStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const { id } = req.params;

        const adoption = await Adoption.findByPk(id);
        if (!adoption) return res.status(404).json({ success: false, message: 'Adoption request not found' });

        adoption.status = status;
        await adoption.save();

        res.status(200).json({ success: true, data: adoption });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error });
    }
};
