// const express = require('express');
// const bodyParser = require('body-parser');
// const authRoutes = require('./routes/authRoutes');
// const pool = require('./config/database'); // Adjust path as needed
// const {sequelize} = require("./config/database")
// const cors = require('cors');  // Import the CORS package

// const petRoutes = require('./routes/petRoutes'); // Import pet routes
// const app = express(); // ✅ Initialize app BEFORE using it



// require('dotenv').config();  // Ensure this is at the top of your main entry file (e.g., index.js)
// app.use(cors());
// app.use(express.json());  // For parsing application/json

// // Middleware to parse JSON and URL-encode d bodies
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Register routes for authentication
// app.use('/api/auth', authRoutes);
// app.use('/api', petRoutes); // Use '/api/pets' for clarity


// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));




// sequelize.sync({ force: true })
// .then(()=>{
//     console.log("DB synced")
// })
// .catch((error)=>{
//     console.log("Error syncing db:",error)
// })
// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, ()=>{
//     console.log(`Server running on http://localhost:${PORT}`);
// })

// index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./config/database');
const petRoutes = require('./routes/petRoutes');

const app = express();
app.use(cors());
app.use(express.json()); // Middleware for parsing JSON bodies
app.use(bodyParser.json()); // Middleware for parsing URL-encoded bodies

// Register the routes
app.use('/api', petRoutes); // This will allow /api/pets endpoint

sequelize.sync()
  .then(() => console.log('DB synced'))
  .catch((error) => console.log('Error syncing db:', error));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});



