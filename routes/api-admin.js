var express = require("express");
var router = express.Router();
var controllers = require("../controllers");
var bcrypt = require("bcryptjs");
var utils = require("../utils");
require("dotenv").config();

router.get("/:action", function(req, res, next) {
  var action = req.params.action;

  if (action === "currentuser") {
    // check for a current user
    if (req.session === null) {
      res.json({
        confirm: "success",
        message: "user not logged in"
      });
      return;
    }
    if (req.session.token === null) {
      res.json({
        confirm: "success",
        message: "user not logged in"
      });
      return;
    }
    var token = req.session.token;
    utils.JWT.verify(token, process.env.TOKEN_SECRET)
      .then(function(decode) {
        return controllers.admin.findById(decode.id);
      })
      .then(function(profile) {
        res.json({
          confirm: "success",
          username: profile.username
        });
      })
      .catch(function(err) {
        res.json({
          confirm: "fail",
          message: "invalid token"
        });
        return;
      });
  }

  if (action === "logout") {
    req.session.reset();
    res.redirect("/admin/login");
  }
});

router.post("/register", function(req, res, next) {
  var credentials = req.body;
  controllers.admin
    .create(credentials)
    .then(function(profile) {
      // create profile token
      var token = utils.JWT.sign({ id: profile._id }, process.env.TOKEN_SECRET);
      req.session.token = token;
      res.redirect("/admin");
      //   res.json({
      //     confirm: "success",
      //     profile: profile,
      //     token: token
      //   });
    })
    .catch(function(err) {
      res.json({
        confirm: "fail",
        message: err.message || err
      });
    });
});

// log in
router.post("/login", function(req, res, next) {
  var credentials = req.body;

  controllers.admin
    .find({ username: credentials.username }, true)
    .then(function(profiles) {
      if (profiles.length == 0) {
        res.json({
          confirm: "fail",
          message: "profile not found."
        });
        return;
      }

      var profile = profiles[0];
      var passwordCorrect = bcrypt.compareSync(
        credentials.password,
        profile.password
      );
      if (passwordCorrect == false) {
        res.json({
          confirm: "fail",
          message: "incorrect password."
        });
        return;
      }
      // login success:
      // create a signed token
      var token = utils.JWT.sign({ id: profile._id }, process.env.TOKEN_SECRET);
      req.session.token = token;
      res.redirect("/admin");
    })
    .catch(function(err) {
      res.json({
        confirm: "fail",
        message: err
      });
    });
});

module.exports = router;
