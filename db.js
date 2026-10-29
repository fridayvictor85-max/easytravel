
const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
    try {
        if (isConnected || mongoose.connection.readyState === 1) {
            console.log("MongoDB already connected ✔");
            return;
        }

        const uri = process.env.MONGODB_URI;

        if (!uri) {
            throw new Error("MONGODB_URI environment variable is missing");
        }

        await mongoose.connect(uri);

        isConnected = true;
        console.log("MongoDB Connected ✔");
        console.log("DB NAME:", mongoose.connection.name);

    } catch (err) {
        console.log("MongoDB FAILED ❌");
        console.log(err.message);
        throw err;
    }
};

module.exports = connectDB;
