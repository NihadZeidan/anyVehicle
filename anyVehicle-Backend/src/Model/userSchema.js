"use strict";

// Requiring Mongoose Package, to Communicate with the Database Server
const mongoose = require("mongoose");

// Jsonwebtoken to generate and verify tokens
const jwt = require("jsonwebtoken");

// Bcrypt to hash and compare the password
const bcrypt = require("bcrypt");

const SECRET = process.env.SECRET;

// Creating User Schema
const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  accessControl: {
    type: String,
    default: "customer",
    enum: ["admin", "customer"],
    required: true,
  },
});

// Create Virtual field for generating token for each user object
userSchema.virtual("token").get(function () {
  let tokenObj = {
    userName: this.userName,
    email: this.email,
  };

  // Token expiries after one hour
  return jwt.sign(tokenObj, SECRET, { expiresIn: 60 * 60 });
});

// Create Virtual field for defining capabilities for different user type
userSchema.virtual("capabilities").get(function () {
  let acl = {
    customer: ["view", "sendRequest"],
    admin: ["editRequest", "viewAll"],
  };

  return acl[this.accessControl];
});

// Before saving the user object hash the password (for better security)
userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

// Basic Authentication (EMAIL and PASSWORD)
userSchema.statics.basicAuth = async function (email, password) {
  try {
    const user = await this.findOne({ email });
    const validate = await bcrypt.compare(password, user.password);

    if (validate) {
      return user;
    } else {
      throw new Error("Invalid Email or Password");
    }
  } catch (e) {
    throw new Error(e.message);
  }
};

// Bearer Authentication (Token)
userSchema.statics.bearerAuth = async function (token) {
  try {
    const parsedToken = jwt.verify(token, SECRET);
    const user = this.findOne({ userName: parsedToken.userName });
    if (user) {
      return user;
    } else {
      throw new Error("Not Authorized");
    }
  } catch (e) {
    throw new Error(e.message);
  }
};

// Wrapping and Exporting the Schema
module.exports = mongoose.model("Users", userSchema);
