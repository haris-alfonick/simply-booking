const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const fs = require("fs");

const authRoutes = require('./router/authRoutes');
const businessRoutes = require('./router/businessRoutes');
require('./models/ConnectDB');
const quoteRoutes = require('./router/quoteRoutes');
const reviewRoute = require('./router/reviewRoutes');
const contectRoutes = require('./router/contectRoutes');
// paypal work
const paymentRoutes = require('./router/paymentRoutes');
dotenv.config({ path: "config/config.env" })

const PORT = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use("/uploads", express.static("uploads"));


app.use('/api/auth', authRoutes);
app.use('/api/businesses', businessRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/reviews', reviewRoute);
app.use("/api/contacts", contectRoutes);

app.use('/api/paypal', paymentRoutes);

app.listen(PORT || 5001, () => {
    console.log(` Server running on port ${PORT}`);
});
