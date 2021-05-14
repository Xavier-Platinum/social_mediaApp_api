const mongoose = require("mongoose");
const PORT = process.env.PORT || 9000;

// const db = require("./database/db.database")
//
module.exports = (app, mongoose, chalk) => {
    if (app.settings.env === ("production")) {
        mongoose.connect(process.env.MONGO_URI_ONLINE, {
            useCreateIndex: true,
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        .then(() => {
            console.log(chalk.green(`\t\tDatabase connected on ${app.settings.env} successfully`));
            app.listen(PORT, () => {
                console.log(chalk.blueBright(`\t\tAPI Started at port ${PORT} on ${app.settings.env} mode`));
            });
        }).catch((err) => {
            console.log(chalk.red(err));
        });
    } else {
        mongoose.connect(process.env.MONGO_URI_LOCAL, {
            useCreateIndex: true,
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        .then(() => {
            console.log(chalk.yellow(`\t\tDatabase connected on ${app.settings.env} successfully`));
            app.listen(PORT, () => {
                console.log(chalk.blueBright(`\t\tAPI Started at port ${PORT} on ${app.settings.env} mode`));
                console.log(chalk.rgb(90,225,120)(`\t\t\thttp://localhost:${PORT}`))
            });
        }).catch((err) => {
            console.log(chalk.red(err));
        });
    }
}