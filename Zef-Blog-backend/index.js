const path = require("path");
require("dotenv").config({path : "./config.env"});
const express = require("express");
const connectToDB = require("./config/connectDB");
const mountRoutes = require("./routes/IndexMountRoute");
const { notFound, errorHandler } = require("./middlewares/errorsHandler");
const cors = require("cors");
const mongoSanitize = require('express-mongo-sanitize');
const { xss } = require("express-xss-sanitizer");
const rateLimiting = require("express-rate-limit");
const compression = require("compression");
const helmet = require("helmet");
const hpp = require("hpp");





// connect to database 
connectToDB();

const app = express();

app.use(express.json());

// security headers (helmet)
app.use(helmet());

// middleware to protect against HTTP Parameter Pollution attacks 
app.use(hpp());


app.get("/" , (req , res) => {
  res.send("Zef-Blog api is running...");
} )


// cors policy 
app.use(cors({
  origin : process.env.FRONT_URL
}));

  // enable other domains accsess the app
  // app.use(cors());
  // app.options("*" , cors());
  



// To apply data Sanitization:
app.use(mongoSanitize());
app.use(xss());

app.use(rateLimiting({
  windowMs : 10 * 60 * 1000 , //10 minutes
  max : 200
}))

// compress all responses 
app.use(compression());

// mount Routes api 
mountRoutes(app);


//erroe handler middleware
app.use(notFound);
app.use(errorHandler);



const port = process.env.PORT || 8000
app.listen(port , () => {
  console.log(`server is running in ${process.env.NODE_ENV} on port ${port}`);
})