const { DataTypes } = require("sequelize");
const {sequelize}= require("../config/database");

const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    Fullname: {
        type: DataTypes.STRING,
        allowNull:true,
        defaultValue:"Unknown",
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
}, { timestamps: true });

module.exports = User;

