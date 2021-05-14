// dotenv
require("dotenv").config();

// env variables
const express = require("express");
const chalk = require("chalk");
const mongoose = require("mongoose");

// app initialised
const app = express();

// middlewares
require("./middlewares/app.middleware")(app, express);

// routings
require("./middlewares/routes.middleware")(app);

require("./server/app.server")(app, mongoose, chalk)