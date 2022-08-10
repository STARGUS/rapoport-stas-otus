const express = require("express");
const PORT = 3001;
const routerCourse = require("./router/course");
const routerAuth = require("./router/auth");
const bodyParser = require("body-parser");
const mongoClient = require("./db");
const cors = require("cors");
const loginMidleware = require("./midleware/login.midleware");
const cookieParser = require("cookie-parser");

run();

async function run() {
  const app = express();
  app.use(cookieParser());
  app.use(bodyParser.json());
  await mongoClient.run();
  app.use(express.static("./client/pages"));
  app.use(cors());
  app.use(loginMidleware);
  app.use("/", routerCourse);
  app.use("/", routerAuth);
  app.listen(
    PORT,
    (err) => !err && console.log("Server started by port " + PORT)
  );
}
