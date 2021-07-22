const authResolver = require("./auth");
const kidResolver = require("./kid");
const relationResolver = require("./relation");
const positionResolver = require("./position");

const rootResolver = {
  ...authResolver,
  ...kidResolver,
  ...relationResolver,
  ...positionResolver
};

module.exports = rootResolver;
