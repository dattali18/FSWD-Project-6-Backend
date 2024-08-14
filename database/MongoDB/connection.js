// config/db.js
const mongoose = require("mongoose");
// require("dotenv").config();

// configure the dotenv using import
require("dotenv").config();


const connect = async () => {
    await mongoose.connect(process.env.MONGO_URI);
};

module.exports = connect;