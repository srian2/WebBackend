const SequelizeMock = require("sequelize-mock");

const sequelizeMock = new SequelizeMock(); // ✅ Initialize the mock database

const usersData = [];
const petsData = [];
const adoptionsData = [];

// ✅ User Mock
const UserMock = sequelizeMock.define("User", {
    id: {
        type: SequelizeMock.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Fullname: SequelizeMock.STRING,
    Email: SequelizeMock.STRING,
    Password: SequelizeMock.STRING,
    dob: SequelizeMock.DATE,
    photo: SequelizeMock.STRING,
    address: SequelizeMock.STRING,
    phoneNumber: SequelizeMock.STRING,
});

// ✅ Override create to enforce unique email constraint
UserMock.create = async (userData) => {
    // Ensure `usersData` is retaining existing users
    if (!Array.isArray(usersData)) {
        throw new Error("usersData is not initialized correctly.");
    }

    const existingUser = usersData.find(user => user.Email.toLowerCase() === userData.Email.toLowerCase());

    if (existingUser) {
        return Promise.reject(new Error("Validation error: Email must be unique"));
    }

    const newUser = {
        id: usersData.length + 1,
        Fullname: userData.Fullname || "Unknown",
        Email: userData.Email,
        Password: userData.Password,
        dob: userData.dob || null,
        photo: userData.photo || null,
        address: userData.address || null,
        phoneNumber: userData.phoneNumber || null,
    };

    usersData.push(newUser);
    return Promise.resolve(newUser);
};
const PetMock = sequelizeMock.define("Pet", {
    id: {
        type: SequelizeMock.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: SequelizeMock.STRING,
    species: SequelizeMock.STRING,
    age: SequelizeMock.INTEGER,
    breed: SequelizeMock.STRING,
    description: SequelizeMock.STRING,
    imageUrl: SequelizeMock.STRING,
});
PetMock.create = async (petData) => {
    if (!petData.name || !petData.species || petData.age === undefined) {
        return Promise.reject(new Error("Validation error: missing required fields"));
    }
    const newPet = { ...petData, id: petsData.length + 1 };
    petsData.push(newPet);
    return Promise.resolve(newPet);
};
PetMock.destroy = async ({ where }) => {
    const petIndex = petsData.findIndex(pet => pet.id === where.id);
    if (petIndex === -1) {
        return Promise.resolve(0); // No pet found
    }
    petsData.splice(petIndex, 1);
    return Promise.resolve(1); // 1 pet deleted
};
PetMock.update = async (updatedData, { where }) => {
    const petIndex = petsData.findIndex(pet => pet.id === where.id);
    if (petIndex === -1) {
        return Promise.resolve([0]); // No pet found
    }

    petsData[petIndex] = { ...petsData[petIndex], ...updatedData };
    return Promise.resolve([1]); // 1 row updated
};

// ✅ Adoption Mock
const AdoptionMock = sequelizeMock.define("Adoption", {

    id: {
        type: SequelizeMock.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: SequelizeMock.STRING,
    email: SequelizeMock.STRING,
    phone: SequelizeMock.STRING,
    address: SequelizeMock.STRING,
    petName: SequelizeMock.STRING,
    reason: SequelizeMock.STRING,
    status: SequelizeMock.STRING,
});


// ✅ Override create to simulate database insert
AdoptionMock.create = async (adoptionData) => {
    if (!adoptionData.name || !adoptionData.email || !adoptionData.phone) {
        return Promise.reject(new Error("Validation error: missing required fields"));
    }
    const newAdoption = { id: adoptionsData.length + 1, status: "Pending", ...adoptionData };
    adoptionsData.push(newAdoption);
    return Promise.resolve(newAdoption);
};


// ✅ Override destroy to simulate deletion
AdoptionMock.destroy = async ({ where }) => {
    const adoptionIndex = adoptionsData.findIndex((adoption) => adoption.id === where.id);
    if (adoptionIndex === -1) {
        return Promise.resolve(0); 
    }

    adoptionsData.splice(adoptionIndex, 1);
    return Promise.resolve(1); 
};

// ✅ Override update to modify existing adoption data
AdoptionMock.update = async (updatedData, { where }) => {
    const adoptionIndex = adoptionsData.findIndex((adoption) => adoption.id === where.id);
    if (adoptionIndex === -1) {
        return Promise.resolve([0]); 
    }

    adoptionsData[adoptionIndex] = { ...adoptionsData[adoptionIndex], ...updatedData };
    return Promise.resolve([1]); 
};

// ✅ Export all mocks and data
module.exports = { sequelizeMock, UserMock, PetMock, petsData, AdoptionMock, adoptionsData, usersData };
