require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./config/database');
const upload = require("./multerConfig"); 

const app = express();
// Import Routes
const petRoutes = require('./routes/petRoutes');
const authRoutes = require('./routes/authRoutes');
const adoptRoutes = require("./routes/adoptRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.use(express.urlencoded({ extended: true })); 
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5174", // Change to your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// ✅ Serve Static Files (Uploads Folder)
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ✅ Register Routes
app.use('/api/pets', petRoutes);
app.use('/api/auth', authRoutes);
app.use("/api/adoptions", adoptRoutes);
app.use("/api/admin", adminRoutes);

// ✅ Start Server
const startServer = async () => {
    try {
        await sequelize.sync({ alter: true }); 
        console.log("✅ Database synced successfully.");
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`🚀 Server is running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("❌ Database sync error:", error);
    }
};
startServer();