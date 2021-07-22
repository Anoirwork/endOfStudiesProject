const { errorType } = require("../Errors/constants");

const getErrorCode = errorName => {
  return errorType[errorName];
};

module.exports = getErrorCode;
