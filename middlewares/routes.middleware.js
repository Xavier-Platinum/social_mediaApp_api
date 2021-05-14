const usersRoutes =  require("../routes/users.routes");
const authRoutes = require("../routes/auth/auth.routes");
module.exports = (app) => {
    app.use("/api/auth", authRoutes);
    app.use("/api/user", usersRoutes);
}