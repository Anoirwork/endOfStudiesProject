const Kid = require("../../model/kid");
const Relation = require("../../model/relation");
const User = require("../../model/user");

const { errorName } = require("../Errors/constants");

const jwt = require("jsonwebtoken");
verifUserId = (args, req) => {
  const authHeader = req.get("Authorization");
  let decodedToken;
  const token = authHeader.split(" ")[1];
  if (!token || token === "") {
  } else {
    decodedToken = jwt.verify(token, "lifemafihesh");
  }
  console.log(args.userId == decodedToken.userId);
  return args.userId == decodedToken.userId;
};

module.exports = {
  relateKid: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("You need to be loged in to preform this action!");
    }
    if (verifUserId(args, req)) {
      const fetchedKid = await Kid.findOne({ _id: args.kidId });
      const fetchedUser = await User.findOne({ _id: args.userId });
      const relation = new Relation({
        user: fetchedUser._id,
        kid: fetchedKid._id
      });
      const result = await relation.save();
      return {
        _id: result._id
      };
    } else {
      throw new Error(errorName.LSCHNAGED);
    }
  }
};
