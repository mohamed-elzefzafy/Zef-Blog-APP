const mongoose = require("mongoose");


module.exports = async () => {
  try {
    await mongoose.connect(process.env.DB_UR);
    console.log("Connected to mongo database successfully");
  } catch (error) {
    console.log("connection failed to mongo database: " , error);
  }
}