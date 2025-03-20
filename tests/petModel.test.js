const { PetMock, petsData } = require("../mocks/sequelize");
describe("Pet Model", () => {
    it("should create a new pet", async () => {
        const pet = await PetMock.create({
            name: "Charlie",
            species: "Cat",
            age: 2,
            breed: "Persian",

            description: "Cute and fluffy",
            imageUrl: "charlie.jpg",
        });
        expect(pet).toHaveProperty("id");
        expect(pet.name).toBe("Charlie");
        expect(pet.species).toBe("Cat");
        expect(pet.age).toBe(2);
    });
    it("should not allow missing required fields", async () => {
        await expect(PetMock.create({ species: "Dog" }))
            .rejects
            .toThrow("Validation error: missing required fields");
    });
});
it("should delete an existing pet", async () => {
    const pet = await PetMock.create({
        name: "Buddy",
        species: "Dog",
        age: 3,
        breed: "Labrador",
        description: "Friendly dog",
        imageUrl: "buddy.jpg",
    });
    const deleteResult = await PetMock.destroy({ where: { id: pet.id } });
    expect(deleteResult).toBe(1); // ✅ Ensure 1 row was deleted
});
it("should not delete a non-existing pet", async () => {
    const deleteResult = await PetMock.destroy({ where: { id: 999 } }); // Non-existent pet ID
    expect(deleteResult).toBe(0); // ✅ Ensure 0 rows were deleted
});
describe("Pet Model", () => {
    it("should update an existing pet", async () => {
        const pet = await PetMock.create({
            name: "Buddy",
            species: "Dog",
            age: 3,
            breed: "Labrador",
            description: "Friendly dog",
            imageUrl: "buddy.jpg",
        });
        const updateResult = await PetMock.update(
            { age: 4, breed: "Golden Retriever" },
            { where: { id: pet.id } }
        );
        expect(updateResult[0]).toBe(1); // ✅ Ensure 1 row was updated
        const updatedPet = petsData.find(p => p.id === pet.id);
        expect(updatedPet.age).toBe(4);
        expect(updatedPet.breed).toBe("Golden Retriever");
    });
    it("should not update a non-existing pet", async () => {
        const updateResult = await PetMock.update(
            { age: 5 },
            { where: { id: 999 } } 
        );
        expect(updateResult[0]).toBe(0); // ✅ Ensure 0 rows were updated
    });
});

