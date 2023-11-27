const autRouter = require("./authRoutes");
const userRouter = require("./userRoutes");

const mountRoutes =(app) => {
app.use("/api/v1/auth"  , autRouter)
app.use("/api/v1/users/profile"  , userRouter)
}

module.exports = mountRoutes;