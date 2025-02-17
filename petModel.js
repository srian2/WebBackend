const { DataTypes } = require('sequelize'); 
const { sequelize } = require('../config/database'); // ✅ Ensure correct import

const Pet = sequelize.define('Pet', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    species: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    breed: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'Pet', // ✅ Ensures correct table name
    timestamps: TransformStreamDefaultController, // If you don't have createdAt/updatedAt columns
});

module.exports = Pet; // ✅ Correct export

