const express = require("express");
const autRouter = require("./routes/authRoutes");
const connectToDB = require("./config/connectDB");
require("dotenv").config();


connectToDB();

const app = express();

app.use(express.json());


app.use("/api/auth" , autRouter);



const port = process.env.PORT || 8000
app.listen(port , () => {
  console.log(`server is running in ${process.env.NODE_ENV} on port ${port}`);
})