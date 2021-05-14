// const express = require("express");
const helmet = require("helmet");
const logger = require("morgan");

module.exports = (app, express) => {
    // configuring helmet 
    app.use(helmet());
    // express middleware
    app.use(express.json({ limit: "1mb" }));
    app.use(express.urlencoded({ extended: true }));

    // morgan middleware
    app.use(logger("combined"));
}