"use strict";

const userSchema = require("../Model/userSchema");

const basicAuth = async function (req, res, next) {
  try {
    const { userName, password } = req.body;

    req.user = await userSchema.basicAuth(userName, password);

    next();
  } catch (e) {
    next("Invalid Username or Password");
  }
};

module.exports = basicAuth;
