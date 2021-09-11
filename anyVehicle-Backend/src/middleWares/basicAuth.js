"use strict";

const userSchema = require("../Model/userSchema");

const basicAuth = async function (req, res, next) {
  try {
    const { email, password } = req.body;

    req.user = await userSchema.basicAuth(email, password);

    next();
  } catch (e) {
    next("Invalid Email or Password");
  }
};

module.exports = basicAuth;
