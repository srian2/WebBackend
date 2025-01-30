const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// Define the Pet model
const Pet = sequelize.define(
  'Pet',
    {
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
      allowNull: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true, 
    },
    image: {
    type: DataTypes.STRING,
    allowNull: true,
    },
},
{
    timestamps: true, // Automatically add `createdAt` and `updatedAt`
    createdAt: 'created_at', // Custom name for createdAt
    updatedAt: 'updated_at', // Custom name for updatedAt
}
);

// Return the model
module.exports = Pet;
