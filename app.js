// dotenv
require("dotenv").config();

// env variables
const PORT = process.env.PORT || 9000;

const express = require("express");
const chalk = require("chalk");
const mongoose = require("mongoose");

// app initialised
const app = express();

// middlewares
require("./middlewares/app.middleware")(app, express);

