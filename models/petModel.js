const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database'); 

const Pet = sequelize.define('Pet',{
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
    tableName: 'Pet', 
    timestamps: TransformStreamDefaultController, 
});

module.exports = Pet; // ✅ Correct export

