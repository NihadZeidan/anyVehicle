"use strict";

const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

const basicAuth = require("../middleWares/basicAuth");
const bearerAuth = require("../middleWares/bearerAuth");

const userSchema = require("../Model/userSchema");
const requestSchema = require("../Model/requestsSchema");

// Creating End-points and handlers

// Login with basic Authentication
router.post("/login", basicAuth, (req, res) => {
  const user = req.user;
  const token = req.user.token;
  res.status(200).json({ user, token });
});

// Register (saving the user to the DataBase)
router.post("/register", async (req, res) => {
  const { userName, password, email, accessControl } = req.body;
  try {
    let saveToDataBase = await userSchema({
      userName,
      password,
      email,
      accessControl,
    }).save();

    res.status(201).json(saveToDataBase);
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
});

// Send Maintenance Request
router.post("/send-request", bearerAuth, async (req, res) => {
  // Taking the user id form the request object
  const relatedUserID = req.user._id;
  const { requestTitle, requestDetails, urgent, userLocation, carModel } =
    req.body;

  try {
    let sendRequestToDataBase = await requestSchema({
      requestTitle,
      requestDetails,
      urgent: JSON.parse(urgent),
      userLocation,
      carModel,
      relatedUser: JSON.stringify(relatedUserID),
    }).save();

    res.status(201).json(sendRequestToDataBase);
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
});

// All user requests
router.get("/all-user-requests", bearerAuth, async (req, res) => {
  const userID = req.user._id;

  try {
    let allRequests = await requestSchema.find({
      relatedUser: JSON.stringify(userID),
    });

    res.status(200).json(allRequests);
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
});

// Admin, view all users requests
router.get("/all-requests", bearerAuth, async (req, res) => {
  let userCapabilities = req.capabilities;

  try {
    //   To check if the user is admin or not
    if (userCapabilities.includes("viewAll")) {
      let findAllRequests = await requestSchema.find();
      res.status(200).json(findAllRequests);
    } else {
      res.send("Not Authorized");
    }
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
});

// Admin, Edit other users' requests status
router.post("/edit-request", bearerAuth, async (req, res) => {
  let userCapabilities = req.capabilities;
  try {
    //   To check if the user is admin or not
    if (userCapabilities.includes("editRequest")) {
      const { requestID, newStatus } = req.body;
      console.log(requestID);
      console.log(typeof newStatus);
      const id = mongoose.Types.ObjectId(requestID);
      console.log("mongoose.Types.ObjectId", id);

      let findRequestAndUpdate = await requestSchema.findOneAndUpdate(
        { _id: id },
        { requestStatus: newStatus }
      );
      res.status(200).json(findRequestAndUpdate);
    } else {
      res.send("Not Authorized");
    }
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
});

module.exports = router;
