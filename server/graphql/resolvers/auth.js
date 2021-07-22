const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../model/user");

const { errorName } = require("../Errors/constants");

verifUserId = (args, req) => {
  const authHeader = req.get("Authorization");
  let decodedToken;
  const token = authHeader.split(" ")[1];
  if (!token || token === "") {
  } else {
    decodedToken = jwt.verify(token, "lifemafihesh");
  }
  console.log(typeof decodedToken.userId, typeof args.userId);
  return args.userId === decodedToken.userId;
};

module.exports = {
  createUser: async (args, res) => {
    try {
      if (await User.findOne({ email: args.userInput.email })) {
        throw new Error(errorName.USEREXIST);
      }
      if (await User.findOne({ number: args.userInput.number })) {
        throw new Error(errorName.USEREXIST);
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      const user = new User({
        lname: args.userInput.lname,
        fname: args.userInput.fname,
        email: args.userInput.email,
        password: hashedPassword,
        number: args.userInput.number,
        gender: args.userInput.gender
      });

      const result = await user.save();
      console.log(result);
      const token = await jwt.sign({ userId: user.id }, "lifemafihesh", {
        expiresIn: "1h"
      });
      return {
        ...result._doc,
        userId: result.id,
        token: token
      };
    } catch (err) {
      throw new Error(errorName.UNEXPECTEDERROR);
    }
  },
  login: async ({ email, password }) => {
    const user = await User.findOne({ email: email });
    if (!user) {
      return { id: 404, msg: "Wrong credentials" };
    }

    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error("Password is incorrect!");
    }
    const token = await jwt.sign({ userId: user.id }, "lifemafihesh", {
      expiresIn: "1h"
    });
    return { userId: user.id, token: token, tokenExpiration: 1 };
  },
  user: async (args, req) => {
    if (!req.isAuth) {
      throw new Error(errorName.UNAUTHORIZED);
    }
    if (verifUserId(args, req)) {
      const user = await User.findOne({ _id: args.userId });
      if (!user) {
        return { id: 1, msg: "User not found in db!" };
      }
      return user;
    } else {
      throw new Error(errorName.UNAUTHORIZED);
    }
  },
  updateUser: async (args, req, res) => {
    if (!req.isAuth) {
      res.status(401).send("You are not able to preform such action.");
    }
    if (verifUserId(args, req)) {
      const user = await User.findOne({ _id: args.userId });
      if (!user) {
        console.log("user doesn't exist");
        throw new Error("User not found");
      } else {
        const isEqual = await bcrypt.compare(args.oldPass, user.password);
        if (isEqual) {
          const hashedPassword = await bcrypt.hash(args.newPass, 12);
          await user.updateOne({ password: hashedPassword }, async (err) => {
            if (err) {
              console.log("Something went wrong when updating data!");
            } else {
              const token = await jwt.sign(
                { userId: user.id },
                "lifemafihesh",
                {
                  expiresIn: "1h"
                }
              );
              return { userId: user.id, token: token, tokenExpiration: 1 };
            }
          });
        } else {
          throw new Error(errorName.WRONGCRED);
        }
      }
    } else {
      throw new Error(errorName.LSCHNAGED);
    }
  }
};
