const { DataTypes } = require('sequelize');

const {sequelize} = require("../config/database")
    // Define the User model
    const User = sequelize.define(
        'User',
        {
            Fullname: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            Email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            Password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            timestamps: true, // Automatically add `createdAt` and `updatedAt`
            createdAt: 'created_at', // Custom name for createdAt
            updatedAt: 'updated_at', // Custom name for updatedAt
        }
    );

    // Return the model

    module.exports = User;
