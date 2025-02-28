const { UserMock, usersData } = require("../mocks/sequelize");
describe("User Model", () => {
    beforeEach(() => {
        usersData.length = 0; // ✅ Clear previous data before each test
    });
    it("should create a new user", async () => {
        const newUser = await UserMock.create({
            Fullname: "Jane Doe",
            Email: "janedoe@example.com",
            Password: "securepassword",
            dob: "1995-02-15",
            photo: "profile.jpg",
            address: "456 Avenue, City",
            phoneNumber: "+977-9801234567",
        });
        expect(newUser.Fullname).toBe("Jane Doe");
        expect(newUser.Email).toBe("janedoe@example.com");
    });
    it("should not allow duplicate emails", async () => {
        // ✅ Insert first user
        await UserMock.create({
            Fullname: "John Doe",
            Email: "johndoe@example.com",
            Password: "securepassword",
        });
        await expect(
            UserMock.create({
                Fullname: "John Doe",
                Email: "johndoe@example.com",
                Password: "securepassword",
            })
        ).rejects.toThrow("Validation error: Email must be unique");
    });
    it("should have a default Fullname if not provided", async () => {
        const user = await UserMock.create({
            Email: "testuser@example.com",
            Password: "testpassword",
        });
        expect(user.Fullname).toBe("Unknown");
    });
});

