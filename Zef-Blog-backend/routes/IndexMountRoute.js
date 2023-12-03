const autRouter = require("./authRoutes");
const userRouter = require("./userRoutes");
const postRouter = require("./postRoutes");
const commentRouter = require("./commentRoute");
const categoryRouter = require("./categoryRoutes");


const mountRoutes =(app) => {
app.use("/api/v1/auth"  , autRouter);
app.use("/api/v1/users"  , userRouter);
app.use("/api/v1/posts"  , postRouter);
app.use("/api/v1/comments"  , commentRouter);
app.use("/api/v1/categories"  , categoryRouter);



}

module.exports = mountRoutes;