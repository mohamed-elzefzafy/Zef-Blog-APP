const express = require("express");
const connectToDB = require("./config/connectDB");
require("dotenv").config();

// connect to database 
connectToDB();

const app = express();

app.use(express.json());


// mount Routes api 
mountRoutes(app);



const port = process.env.PORT || 8000
app.listen(port , () => {
  console.log(`server is running in ${process.env.NODE_ENV} on port ${port}`);
})