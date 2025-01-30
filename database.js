const { Pool } = require('pg');
const { Sequelize } = require('sequelize');

// Initialize Sequelize for ORM
const sequelize = new Sequelize("Project", "postgres","admin123", {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging:false,
});

// Run the connection tests

// Export the connections for reuse
module.exports = {  sequelize };
