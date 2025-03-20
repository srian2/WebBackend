const { PetMock, AdoptionMock, petsData, adoptionsData } = require("../mocks/sequelize");
beforeEach(() => {
    if (!global.adoptionsData) {
        global.adoptionsData = [];  // ✅ Ensure `adoptionsData` is always an array
    }
    adoptionsData.length = 0; // ✅ Clear the array before each test
});
describe("Admin Functions", () => {
  it("should allow admin to add a pet", async () => {
    const pet = await PetMock.create({
      name: "Max",
      species: "Dog",
      age: 5,
      breed: "Golden Retriever",
      description: "Very friendly",
      imageUrl: "max.jpg",
    });
    expect(pet).toHaveProperty("id");
    expect(pet.name).toBe("Max");
    expect(pet.species).toBe("Dog");
  });
  it("should allow admin to approve an adoption request", async () => {
    // ✅ Ensure `adoptionsData` exists before pushing data
    if (!adoptionsData) throw new Error("adoptionsData is not defined!");
    const adoption = {
      id: 1,
      name: "Alice Doe",
      email: "alice@example.com",
      phone: "9876543210",
      address: "123 Street, City",
      petName: "Buddy",
      reason: "Loves dogs",
      status: "Pending",
    };
    adoptionsData.push(adoption); 
    const updateResult = await AdoptionMock.update(
      { status: "Approved" },
      { where: { id: adoption.id } }
    );
    expect(updateResult[0]).toBe(1); 
    const updatedAdoption = adoptionsData.find((a) => a.id === adoption.id);
    expect(updatedAdoption.status).toBe("Approved");
  });
  it("should allow admin to reject an adoption request", async () => {
    if (!adoptionsData) throw new Error("adoptionsData is not defined!");
    const adoption = {
      id: 2,
      name: "John Doe",
      email: "john@example.com",
      phone: "1234567890",
      address: "456 Avenue, City",
      petName: "Charlie",
      reason: "Wants a companion",
      status: "Pending",
    };
    adoptionsData.push(adoption);
    const updateResult = await AdoptionMock.update(
      { status: "Rejected" },
      { where: { id: adoption.id } }
    );
    expect(updateResult[0]).toBe(1); 
    const updatedAdoption = adoptionsData.find((a) => a.id === adoption.id);
    expect(updatedAdoption.status).toBe("Rejected");
  });
});
