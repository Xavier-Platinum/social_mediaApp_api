if (process.env.NODE_ENV === ("production")) {
    const db = process.env.MONGO_URI_ONLINE
} else {
    const db = process.env.MONGO_URI_LOCAL
}