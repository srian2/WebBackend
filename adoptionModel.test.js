const { AdoptionMock } = require("../mocks/sequelize");

describe("Adoption Model", () => {
    it("should create a new adoption request", async () => {
        const adoption = await AdoptionMock.create({
            name: "Alice Doe",
            email: "alice@example.com",
            phone: "9876543210",
            address: "456 Avenue, City",
            petName: "Charlie",
            reason: "I have always wanted a pet",
        });

        expect(adoption).toHaveProperty("id");
        expect(adoption.name).toBe("Alice Doe");
        expect(adoption.status).toBe("Pending"); // ✅ Default status should be 'Pending'
    });

    it("should not allow missing required fields", async () => {
        await expect(AdoptionMock.create({ petName: "Charlie" }))
            .rejects
            .toThrow("Validation error: missing required fields");
    });

    it("should update an adoption request", async () => {
        const updateResult = await AdoptionMock.update(
            { status: "Approved" },
            { where: { id: 1 } }
        );

        expect(updateResult[0]).toBe(1); // ✅ Ensure 1 row was updated
    });

    it("should not update a non-existing adoption request", async () => {
        const updateResult = await AdoptionMock.update(
            { status: "Approved" },
            { where: { id: 999 } }
        );

        expect(updateResult[0]).toBe(0); // ✅ Ensure 0 rows were updated
    });

    it("should delete an adoption request", async () => {
        const deleteResult = await AdoptionMock.destroy({ where: { id: 1 } });

        expect(deleteResult).toBe(1); // ✅ Ensure 1 row was deleted
    });

    it("should not delete a non-existing adoption request", async () => {
        const deleteResult = await AdoptionMock.destroy({ where: { id: 999 } });

        expect(deleteResult).toBe(0); // ✅ Ensure 0 rows were deleted
    });
});
