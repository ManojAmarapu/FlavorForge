const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI || process.env.MONGO_URI === 'your_mongo_uri_here') {
            console.warn('MongoDB URI is not configured or using a placeholder. Skipping connection for now.');
            return;
        }
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        // Not exiting process so server can still start for testing
    }
};

module.exports = connectDB;

module.exports = connectDB;
