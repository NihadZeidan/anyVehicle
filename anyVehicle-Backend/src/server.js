"use strict";

// Requiring needed packages
const express = require("express");
const app = express();
const cors = require("cors");

const Routes = require("./Module/routes");

// Requiring MiddleWares
const handleNotFound = require("./errorHandlers/404");
const handleInternalServerError = require("./errorHandlers/500");

// MiddleWares
//To Read Data From The Body (Request Headers)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// To Allow Communication (Resource Sharing) With The Front End App
app.use(cors());

// Use Server Routes
app.use(Routes);

// Use Error Handlers
app.use(handleInternalServerError);
app.use("*", handleNotFound);

// Starting the server
function start(port) {
  app.listen(port, () => console.log("Listening on ", port));
}

module.exports = {
  start,
  app,
};
