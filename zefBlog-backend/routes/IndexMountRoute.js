const autRouter = require("./authRoutes");

const mountRoutes =(app) => {
app.use("/api/auth"  , autRouter)
}

module.exports = mountRoutes;