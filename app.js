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

require("./server/app.server")(app, mongoose, chalk)