const mongoose = require('mongoose');

const uri = "mongodb+srv://victorious:Godwin%4012345@cluster0.oaxlr2w.mongodb.net/easytravel?retryWrites=true&w=majority&appName=Cluster0";
let isConnected = false;

const connectDB = async () => {
    try {

        if (isConnected || mongoose.connection.readyState === 1) {
            console.log("MongoDB already connected ✔");
            return;
        }

        await mongoose.connect(uri);

        isConnected = true;

        console.log("MongoDB Connected ✔");

    } catch (err) {

        console.log("MongoDB FAILED ❌");
        console.log(err.message);

        throw err; // important so server knows it failed
    }

    mongoose.connection.on("connected", () => {
    console.log("DB NAME:", mongoose.connection.name);
});
};

module.exports = connectDB;