const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const PORT = 3000;
const routerCourse = require("./router/course");
let db;
const dbPromise = new Promise((resolve, reject) => {
  MongoClient.connect("mongodb://localhost:27017", (err, client) => {
    if (err) return reject(err);
    resolve(client.db("otus"));
  });
});
dbPromise
  .then((_db) => {
    db = _db;
    app.listen(PORT, () => console.log("Listen on 3000"));
  })
  .catch((err) => {
    console.error(err);
  });

app.use(
  express.json({
    limit: "5mb",
  })
);

app.use("/course", routerCourse);
