const path = require("path");
require("dotenv").config({path : "./config.env"});
const express = require("express");
const connectToDB = require("./config/connectDB");
const mountRoutes = require("./routes/IndexMountRoute");


// connect to database 
connectToDB();

const app = express();

app.use(express.json());


// mount Routes api 
mountRoutes(app);

app.get("/" , (req , res) => {
  res.send("Zef-Blog api is running...");
} )

const port = process.env.PORT || 8000
app.listen(port , () => {
  console.log(`server is running in ${process.env.NODE_ENV} on port ${port}`);
})