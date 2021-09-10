"use strict";

const express = require("express");
const router = express.Router();

const basicAuth = require("../middleWares/basicAuth");
const bearerAuth = require("../middleWares/bearerAuth");

const userSchema = require("../Model/userSchema");
const requestSchema = require("../Model/requestsSchema");

// Creating End-points and handlers

// Login with basic Authentication
router.post("/login", basicAuth, (req, res) => {
  const user = req.user;
  const token = req.user.token;
  res.cookie("token", token);
  res.status(200).json(user);
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

// Logout by clearing the token form cookies
router.get("/logout", (req, res) => {
  res.clearCookie("token");

  res.send("Logged out successfully");
});

// Send Maintenance Request
router.post("/send-request", bearerAuth, async (req, res) => {
  // Taking the user id form the request object
  const relatedUserID = req.user._id;
  const { requestTitle, requestDetails, requestDate } = req.body;

  try {
    let sendRequestToDataBase = await requestSchema({
      requestTitle,
      requestDetails,
      requestDate,
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

      let findRequestAndUpdate = await requestSchema.findByIdAndUpdate(
        { _id: requestID },
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
