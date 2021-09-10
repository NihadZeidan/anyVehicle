"use strict";

const userSchema = require("../Model/userSchema");

const bearerAuth = async function (req, res, next) {
  try {
    if (req.headers.authorization) {
      let token = req.headers.authorization.split(" ").pop();
      const user = await userSchema.bearerAuth(token);

      console.log("user", user);

      req.user = user;

      req.capabilities = user.capabilities;

      next();
    }
  } catch (e) {
    res.status(401);
    next("Not Authorized");
  }
};

module.exports = bearerAuth;
