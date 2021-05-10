const mongoose = require("mongoose");
const db = require("./database/db.database")
//
module.exports = (app, mongoose, db) => {
    if (app.settings.env === ("production")) {
        mongoose.connect(db, {
            useCreateIndex: true,
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        .then(() => {
            console.log((`Database connected successfully`));
        }).catch((err) => {
            console.log(err);
        });
        app.listen(PORT, () => {
            console.log(chalk.blueBright(`\t\tAPI Started at port ${PORT} on ${app.settings.env} mode`));
        });
    }
}