var mongoose = require("mongoose");
var express = require("express");
var path = require("path");
var dbConn = require("../user_modules/dbConfig"); // Config User Module for Mongodb
var UserModel = require("../Schemas/UserSchema"); // UserModel is Returned by the Schema connected to Model
var bodyparser = require("body-parser");
var fileUpload = require("express-fileupload");

var app = express.Router();

app.use(fileUpload());
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ limit: "2mb", extended: true }));

app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/save", async (req, resp) => {
  console.log("Req-Received");
  console.log(req.query);
  await UserModel.create(req.query, (err, result) => {
    if (err) {
      resp.send(err);
      return;
    }
    resp.set("json");
    resp.json(result);
    console.log(result);
  });
});

app.post("/save-post", async (req, resp) => {
  console.log(JSON.stringify(req.body));
  await UserModel.create(req.body, (err, result) => {
    if (err) {
      resp.send(err);
      return;
    }
    resp.send({ result: result, msg: "success" });
    console.log(result);
  });
});

app.post("/delete", (req, resp) => {
  UserModel.deleteOne({ uid: req.body.uid }).then((result) => {
    console.log(result);
    if (result.deletedCount != 0) resp.json({ msg: "Deleted" });
    else resp.json({ msg: "Invalid id/fn" });
  });
});

app.post("/update-post", (req, resp) => {
  UserModel.update(
    { uid: req.body.uid },
    { $set: { pwd: req.body.pwd, mob: req.body.mob } }
  ).then(function (result) {
    console.log(result);
    if (result.nModified != 0) resp.json({ msg: "Updated" });
    else resp.json({ msg: "Invalid id" });
  });
});

app.post("/fetch", (req, resp) => {
  UserModel.find({ uid: req.body.uid })
    .then((result) => {
      console.log(result.length + " Records Found");
      resp.json(result);
    })
    .catch((err) => {
      resp.json({ errmsg: err });
    });
});

app.get("/fetchAll", (req, resp) => {
  UserModel.find()
    .then((result) => {
      console.log(result.length + " Records Found");
      resp.json(result);
    })
    .catch((err) => {
      resp.json({ errmsg: err });
    });
});

app.post("/save-with-img", async (req, resp) => {
  console.log(req.body);
  if (req.files == null) {
    req.body.picname = "nopic.jpg";
  } else {
    var filename = req.files.file.name;
    fileext = filename.substring(filename.lastIndexOf("."), filename.length);

    req.body.picname = req.body.uid.replace(/\s/g, "") + fileext;
    var fullPath = path.join(
      __dirname,
      "../",
      "testapp",
      "public",
      "uploads",
      req.body.picname
    );
    req.files.file.mv(fullPath, (err) => {
      if (err) console.log(err);
      else {
        console.log("File moved...");
      }
    });
  }

  await UserModel.create(req.body, (err, result) => {
    if (err) {
      resp.send(err);
      return;
    }
    resp.send({ result: result, msg: "success" });
    console.log(result);
  });
});

app.post("/update-with-img", async (req, resp) => {
  var filename = req.files.newpic.name;
  fileext = filename.substring(filename.lastIndexOf("."), filename.length);
  filenamewithoutext = filename.substring(0, filename.lastIndexOf("."));

  req.body.picname =
    filenamewithoutext.replace(/\s/g, "") + req.body.uid + fileext;
  var fullPath = path.join(
    __dirname,
    "../",
    "testapp",
    "public",
    "uploads",
    req.body.picname
  );
  req.files.newpic.mv(fullPath, (err) => {
    if (err) console.log(err);
    else {
      console.log("File moved...");
    }
  });

  await UserModel.update(
    { uid: req.body.uid },
    {
      $set: { pwd: req.body.pwd, mob: req.body.mob, picname: req.body.picname },
    }
  ).then(function (result) {
    if (result.nModified != 0) resp.json({ msg: "Updated" });
    else resp.json({ msg: "Invalid id" });
  });
});

app.post("/update-with-img-cld", async (req, resp) => {
  await UserModel.update(
    { uid: req.body.uid },
    { $set: { pwd: req.body.pwd, mob: req.body.mob, picname: req.body.newpic } }
  ).then(function (result) {
    console.log(result);
    if (result.nModified != 0) resp.json({ msg: "Updated" });
    else resp.json({ msg: "Invalid id" });
  });
});

module.exports = app;
