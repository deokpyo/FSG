var express = require("express");
var router = express.Router();
var controllers = require("../controllers");

/* GET app page. */
router.get("/", function(req, res, next) {
  res.render("app", { title: "FSG" });
});

/* GET thankyou page. */
router.get("/quote/:id", function(req, res, next) {
  var controller = controllers["quote"];
  controller.findById(req.params.id, function(err, result) {
    if (err) {
      res.render("error", { message: err.mesage, error: err });
      return;
    }
    var template = {
      title: "Estimated Quote",
      unitPrice: result.unitPrice
    }
    res.render("quote", template);
  });
});

/* GET test page. */
router.get("/test", function(req, res, next) {
  res.render("test", { title: "Test Page" });
});

module.exports = router;
