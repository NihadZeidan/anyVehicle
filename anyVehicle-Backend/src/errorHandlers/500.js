"use strict";

function handleInternalServerError(err, req, res, next) {
    
  // Sometime errors come as an object, others as a string
  const error = err.message ? err.message : err;

  const errorObj = {
    status: 500,
    message: error,
  };

  res.status(500).json(errorObj);
}

module.exports = handleInternalServerError;
