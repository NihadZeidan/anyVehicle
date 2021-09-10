"use strict";

require("dotenv").config();
const mongoose = require("mongoose");
const server = require("./src/server");

// Application Environmental Variables
const PORT = process.env.PORT;
const DATABASE_URI = process.env.DATABASE_URI;

// Connecting to the Database then to the Server
mongoose
  .connect(DATABASE_URI)
  .then(() => {
    console.log("Connected to the DataBase");
    server.start(PORT);
  })
  .catch((e) => console.error(e));
