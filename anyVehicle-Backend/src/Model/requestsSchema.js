"use strict";

// Requiring Mongoose Package, to Communicate with the Database Server
const mongoose = require("mongoose");

// Creating User Schema
const requestSchema = new mongoose.Schema({
  requestTitle: { type: String, required: true },
  requestStatus: { type: String, default: "Pending" },
  requestDetails: { type: String, required: true },
  requestDate: { type: String, required: true },
  relatedUser: { type: String, required: true },
});

// Wrapping and Exporting the Schema
module.exports = mongoose.model("Request", requestSchema);
