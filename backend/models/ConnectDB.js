const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: 'config/config.env' });

const { MONGO_URI } = process.env;

if (!MONGO_URI) {
    console.error(' MONGO_URI is not defined in environment variables');
    process.exit(1);
}

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error.message);
        process.exit(1);
    });
