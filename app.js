var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var sessions = require("client-sessions");
var app = express();
require("dotenv").config();

// mongoDB connection setup
var mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI, function(err, res) {
  if (err) {
    console.log("DB CONNECTION FAILED: " + err);
  } else {
    console.log("DB CONNECTION SUCCESS: " + process.env.MONGODB_URI);
  }
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hjs");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  sessions({
    cookieName: "session",
    secret: process.env.SESSION_SECRET,
    duration: 24 * 60 * 60 * 1000,
    activeDuration: 30 * 60 * 1000
  })
);
app.use(express.static(path.join(__dirname, "public")));

// express router setup
var indexRouter = require("./routes/index");
var apiRouter = require("./routes/api");
var apiAdminRouter = require("./routes/api-admin");
app.use("/", indexRouter);
app.use("/api", apiRouter);
app.use("/api-admin", apiAdminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
