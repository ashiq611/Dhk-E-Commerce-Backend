const mongoose = require("mongoose");
const { mongoDBURI } = require("../secret");

const connectDB = async (option = {}) => {
    try {
        const conn = await mongoose.connect(mongoDBURI, option);

        console.log(`MongoDB Connected: ${conn.connection.host}`);

        mongoose.connection.on("error", (error) => {
            console.error("Error: ", error.message);
        });
    } catch (error) {
        console.error(`Could not connect. Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;