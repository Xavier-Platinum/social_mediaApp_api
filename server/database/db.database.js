if (app.settings.env === ("production")) {
    module.exports = db = process.env.MONGO_URI_ONLINE
} else {
    module.exports = db = process.env.MONGO_URI_LOCAL
}