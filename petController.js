const Pet = require('../models/petModel'); // Adjust the path based on your project structure

// Controller function to add a pet
const addPet = async (req, res) => {
  const { name, species, age, breed, description, image } = req.body;

  try {
    // Check if all required fields are provided
    if (!name || !species || !age) {
      return res.status(400).json({ message: 'Name, species, and age are required.' });
    }

    // Create a new pet record in the database
    const newPet = await Pet.create({
    name,
    species,
    age,
    breed,
    description,
    image
    });

    res.status(201).json({ message: 'Pet added successfully!', pet: newPet });
  } catch (error) {
    console.error('Error adding pet:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

 
// Get All Pets Function
const getAllPets = async (req, res) => {
    try {
        // Retrieve all pets from the database
        const pets = await Pet.findAll();
        res.status(200).json(pets);
    } catch (error) {
        console.error('Error fetching pets:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get Pet by ID Function
const getPetById = async (req, res) => {
    const { id } = req.params;

    try {
        // Find the pet by ID
        const pet = await Pet.findByPk(id);
        if (!pet) {
            return res.status(404).json({ message: 'Pet not found' });
        }

        res.status(200).json(pet);
    } catch (error) {
        console.error('Error fetching pet:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update Pet Function
const updatePet = async (req, res) => {
    const { id } = req.params;
    const { name, species, age, breed, description, image } = req.body;

    try {
        // Find pet by ID
        const pet = await Pet.findByPk(id);
        if (!pet) {
            return res.status(404).json({ message: 'Pet not found' });
        }

        // Update pet details
        pet.name = name || pet.name;
        pet.species = species || pet.species;
        pet.age = age || pet.age;
        pet.breed = breed || pet.breed;
        pet.description = description !== undefined ?description : pet.description;
        pet.image = image || pet.image;

        await pet.save();

        res.status(200).json({ message: 'Pet updated successfully', pet });
    } catch (error) {
        console.error('Error updating pet:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete Pet Function
const deletePet = async (req, res) => {
    const { id } = req.params;

    try {
        // Find pet by ID
        const pet = await Pet.findByPk(id);
        if (!pet) {
            return res.status(404).json({ message: 'Pet not found' });
        }

        // Delete pet
        await pet.destroy();

        res.status(200).json({ message: 'Pet deleted successfully' });
    } catch (error) {
        console.error('Error deleting pet:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Export Functions
module.exports = {
    addPet,
    getAllPets,
    getPetById,
    updatePet,
    deletePet
};
