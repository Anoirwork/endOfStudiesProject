const Kid = require("../../model/kid");
const Relation = require("../../model/relation");
const jwt = require("jsonwebtoken");

const { errorName } = require("../Errors/constants");

verifUserId = (args, req) => {
  const authHeader = req.get("Authorization");
  let decodedToken;
  const token = authHeader.split(" ")[1];
  if (!token || token === "") {
    console.log("token fergha wela mafmésh");
  } else {
    decodedToken = jwt.verify(token, "lifemafihesh");
  }
  console.log(args.userId, decodedToken);
  return args.userId == decodedToken.userId;
};

module.exports = {
  createKid: async (args, req, res) => {
    if (!req.isAuth) {
      throw new Error("1");
    }
    if (verifUserId(args, req)) {
      try {
        const kid = new Kid({
          name: args.kidInput.name,
          number: args.kidInput.number,
          birthDay: args.kidInput.birthDay,
          email: args.kidInput.email
        });

        try {
          const result = await kid.save();
          return { ...result._doc, _id: result._id };
        } catch (err) {
          throw new Error(errorName.KIDISSUE);
        }
      } catch (err) {
        throw new Error(errorName.KIDDBISSUE);
      }
    } else {
      throw new Error(errorName.UNAUTHORIZED);
    }
  },
  kid: async () => {
    try {
      if (!req.isAuth) {
        throw new Error(errorName.UNAUTHORIZED);
      }
      const kids = await Kid.find();
      return kids.map(kid => {
        return kid;
      });
    } catch (err) {
      throw new Error(errorName.KIDNOTFOUND);
    }
  },
  kidsRelated: async (args, req) => {
    try {
      if (!req.isAuth) {
        return { id: "1", msg: "You must be logged in." };
      }
      const relation = await Relation.find({ user: args.userId });
      const kidsRelated = relation.map(async rel => {
        if (rel.user == args.userId) {
          return await Kid.findOne({ _id: rel.kid });
        }
      });
      return kidsRelated;
    } catch (err) {
      throw new Error(errorName.RELATEKID);
    }
  },
  delKid: async (args, req) => {
    try {
      if (!req.isAuth) {
        throw new Error(errorName.UNAUTHORIZED);
      }
      const relation = await Relation.findOne({
        user: args.userId,
        kid: args.kidId
      });
      Kid.findByIdAndDelete({ _id: relation.kid })
        .then(res => {
          console.log("kid delete with success");
        })
        .catch(err => {
          throw new Error(errorName.KIDNOTFOUND);
        });
      Relation.findByIdAndDelete({ _id: relation._id })
        .then(res => {
          console.log("Relation relate to that kid have been deleted");
        })
        .catch(err => {
          throw new Error(errorName.DELETERELATION);
        });
    } catch (err) {
      throw new Error(errorName.DELKID);
    }
  },
  updateKid: async (args, req) => {
    try {
      if (!req.isAuth) {
        throw new Error(errorName.UNAUTHORIZED);
      }

      const result = await Kid.findByIdAndUpdate(
        { _id: args.kidId },
        args.kidInput,
        function(err, list) {
          if (err) {
            throw new Error(errorName.UNEXPECTEDERROR);
          } else {
            return list;
          }
        }
      );

      return { ...result._doc, _id: result._id };
    } catch (err) {
      console.log(err);
      throw new Error(errorName.UPDATEKIDISSUE);
    }
  }
};
