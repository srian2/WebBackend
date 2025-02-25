import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [pets, setPets] = useState([]);
    const [adoptions, setAdoptions] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    
    const [newPet, setNewPet] = useState({
        name: "",
        species: "",
        age: "",
        breed: "",
        description: "",
        imageUrl: ""
    });

    // Fetch data from API
    useEffect(() => {
        fetch("http://localhost:3000/api/auth/getAllUsers")
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error("Error fetching users:", error));

        fetch("http://localhost:3000/api/pets")
            .then(response => response.json())
            .then(data => setPets(data))
            .catch(error => console.error("Error fetching pets:", error));

        fetch("http://localhost:3000/api/adoptions/getAdoptions")
            .then(response => response.json())
            .then(data => setAdoptions(data.adoptions))
            .catch(error => console.error("Error fetching adoptions:", error));
    }, []);

    // Handle status change in adoption requests
    const handleStatusChange = (adoptionId, newStatus) => {
        fetch(`http://localhost:3000/api/adoptions/updateStatus/${adoptionId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: newStatus }),
        })
        .then(response => response.json())
        .then(data => {
            setAdoptions(prevAdoptions =>
                prevAdoptions.map(adoption =>
                    adoption.id === adoptionId ? { ...adoption, status: newStatus } : adoption
                )
            );
        })
        .catch(error => console.error("Error updating status:", error));
    };

    // Handle input change for adding a pet
    const handleInputChange = (e) => {
        setNewPet({ ...newPet, [e.target.name]: e.target.value });
    };

    // Handle form submission for adding a pet
    const handleAddPet = (e) => {
        e.preventDefault();

        fetch("http://localhost:3000/api/pets/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newPet),
        })
        .then(response => response.json())
        .then(data => {
            setPets([...pets, data]);
            setNewPet({ name: "", species: "", age: "", breed: "", description: "", imageUrl: "" });
            setIsPopupOpen(false);
        })
        .catch(error => console.error("Error adding pet:", error));
    };

    return (
        <div className="container">
            <h1>Admin Dashboard</h1>

            {/* Users Section */}
            <section className="section">
                <h2>Users</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th><th>Full Name</th><th>Email</th>
                            <th>DOB</th><th>Photo</th><th>Address</th><th>Phone Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.Fullname}</td>
                                    <td>{user.Email}</td>
                                    <td>{user.dob}</td>
                                    <td><img src={user.photo} alt="User" width="50" /></td>
                                    <td>{user.address}</td>
                                    <td>{user.phoneNumber}</td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="7">No users found.</td></tr>
                        )}
                    </tbody>
                </table>
            </section>

            {/* Pets Section */}
            <section className="section">
                <h2>Pets</h2>

                {/* Add Pet Button */}
                <button className="add-pet-btn" onClick={() => setIsPopupOpen(true)}>Add Pet</button>

                {/* Add Pet Popup */}
                {isPopupOpen && (
                    <div className="popup">
                        <div className="popup-content">
                            <h2>Add a New Pet</h2>
                            <form onSubmit={handleAddPet} className="add-pet-form">
                                <input type="text" name="name" value={newPet.name} onChange={handleInputChange} placeholder="Pet Name" required />
                                <input type="text" name="species" value={newPet.species} onChange={handleInputChange} placeholder="Species" required />
                                <input type="number" name="age" value={newPet.age} onChange={handleInputChange} placeholder="Age" required />
                                <input type="text" name="breed" value={newPet.breed} onChange={handleInputChange} placeholder="Breed" required />
                                <input type="text" name="description" value={newPet.description} onChange={handleInputChange} placeholder="Description" required />
                                <input type="text" name="imageUrl" value={newPet.imageUrl} onChange={handleInputChange} placeholder="Image URL" required />
                                <button type="submit">Add Pet</button>
                                <button type="button" className="close-btn" onClick={() => setIsPopupOpen(false)}>Cancel</button>
                            </form>
                        </div>
                    </div>
                )}

                {/* Pets Table */}
                <table>
                    <thead>
                        <tr>
                            <th>Name</th><th>Species</th><th>Age</th><th>Breed</th>
                            <th>Description</th><th>Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pets.length > 0 ? (
                            pets.map(pet => (
                                <tr key={pet.id}>
                                    <td>{pet.name}</td>
                                    <td>{pet.species}</td>
                                    <td>{pet.age}</td>
                                    <td>{pet.breed}</td>
                                    <td>{pet.description}</td>
                                    <td><img src={pet.imageUrl} alt="Pet" width="50" /></td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="6">No pets available.</td></tr>
                        )}
                    </tbody>
                </table>
            </section>

            {/* Adoption Requests Section */}
            <section className="section">
                <h2>Adoption Requests</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Full Name</th><th>Email</th>
                            <th>Pet Name</th><th>Address</th><th>Phone Number</th><th>Reason</th><th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {adoptions.length > 0 ? (
                            adoptions.map(request => (
                                <tr key={request.id}>
                                    <td>{request.name}</td>
                                    <td>{request.email}</td>
                                    <td>{request.petName}</td>
                                    <td>{request.address}</td>
                                    <td>{request.phone}</td>
                                    <td>{request.reason}</td>
                                    <td>
                                        <select
                                            value={request.status}
                                            onChange={(e) => handleStatusChange(request.id, e.target.value)}
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Approved">Approved</option>
                                            <option value="Rejected">Rejected</option>
                                        </select>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="7">No adoption requests.</td></tr>
                        )}
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default AdminDashboard;
