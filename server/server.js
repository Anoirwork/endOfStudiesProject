const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const graphSch = require("./graphql/schema/index");
const graphRes = require("./graphql/resolvers/index");
const isAuth = require("./middleware/is-auth");
const app = require("express")();
const PORT = process.env.port || "4000";
const socket = require('./socket/socket');

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "POST");
  res.header("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(bodyParser.json());

app.use(isAuth);

app.use("/api", (req, res) => {
  graphqlHTTP({
    schema: graphSch,
    graphiql: true,
    rootValue: graphRes
    /*customFormatErrorFn: err => {
      const error = getErrorCode(err.message);
      return {
        error: error.message,
        statusCode: error.statusCode,
        x: error.forceLogOut
      };
    }*/
  })(req, res);
});
mongoose
  .connect(
    "mongodb://localhost:27017/myapp",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => {
    app.listen(process.env.PORT || 4000, function() {
      console.log("Express server listening on port %d in %s mode",PORT);
    });
  })
  .catch(err => {
    console.log(err);
  });
app.get("/", (req, res) => {
  res.send("hello world");
});

//This is for detecting the change on the collection of Postion to make somthing like push up notification

/**/
//mongodb://localhost:27017/myapp
//mongodb+srv://admin:wowlol123@cluster0-dvwlr.gcp.mongodb.net/events-react-dev?retryWrites=true&w=majority
