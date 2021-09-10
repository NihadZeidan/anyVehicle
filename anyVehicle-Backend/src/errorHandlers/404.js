"use strict";

function handleNotFound(req, res, next) {
  const errorObj = {
    status: 404,
    message: "Sorry we could not find what you are looking for !",
  };

  res.status(404).json(errorObj);
}

module.exports = handleNotFound;
