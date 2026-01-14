const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./router/authRoutes');
const businessRoutes = require('./router/businessRoutes');
require('./models/ConnectDB');

const PORT = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));


app.use('/api/auth', authRoutes);
app.use('/api/businesses', businessRoutes);


app.listen(PORT || 5001, () => {
    console.log(` Server running on port ${PORT}`);
});
