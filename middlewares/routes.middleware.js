const usersRoutes =  require("../routes/users.routes");
const authRoutes = require("../routes/auth/auth.routes");
const postsRoutes = require("../routes/posts/posts.routes");
module.exports = (app) => {
    app.use("/api/auth", authRoutes);
    app.use("/api/user", usersRoutes);
    app.use("/api/posts", postsRoutes);
}