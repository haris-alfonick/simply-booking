const express = require('express');
const dotenv = require('dotenv');
const verifyToken = require('./middleware/VerifyToken');
require('./models/ConnectDB')
dotenv.config({ path: 'config.env' });

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.get("/protected", verifyToken, (req, res) => {
    res.json({ message: "Access granted", user: req.user });
});


const authRoutes = require("./routes/authRoutes");


app.use("/api/auth", authRoutes);

// Start server
app.listen(PORT || 5001, () => {
    console.log(` Server running on port ${PORT}`);
});
