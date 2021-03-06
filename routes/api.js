var express = require("express");
var router = express.Router();
var controllers = require("../controllers");

// GET all call
router.get("/:resource", function(req, res, next) {
  var resource = req.params.resource;
  var controller = controllers[resource];

  if (controller == null) {
    res.json({
      confirmation: "fail",
      result: "Invalid Resource Request: " + resource
    });
    return;
  }

  controller.find(req.query, function(err, result) {
    if (err) {
      res.json({
        confirmation: "fail",
        message: err
      });
      return;
    }
    res.json({
      confirmation: "success",
      result: result
    });
  });
});

// GET By ID call
router.get("/:resource/:id", function(req, res, next) {
  var resource = req.params.resource;
  var id = req.params.id;
  var controller = controllers[resource];

  if (controller == null) {
    res.json({
      confirmation: "fail",
      message: "Invalid Resource Request: " + resource
    });
    return;
  }

  controller.findById(id, function(err, result) {
    if (err) {
      res.json({
        confirmation: "fail",
        message: "Not Found"
      });
      return;
    }
    res.json({
      confirmation: "success",
      result: result
    });
  });
});

// DELETE call
router.delete("/:resource/:id", function(req, res, next) {
  var resource = req.params.resource;
  var id = req.params.id;
  var controller = controllers[resource];

  if (controller == null) {
    res.json({
      confirmation: "fail",
      message: "Invalid Resource Request: " + resource
    });
    return;
  }

  controller.delete(id, function(err, result) {
    if (err) {
      res.json({
        confirmation: "fail",
        message: "id not found: " + id
      });
      return;
    }
    res.json({
      confirmation: "success",
      result: result
    });
  });
});

// UPDATE call
router.put("/:resource/:id", function(req, res, next) {
  var resource = req.params.resource;
  var id = req.params.id;
  var controller = controllers[resource];

  if (controller == null) {
    res.json({
      confirmation: "fail",
      message: "Invalid Resource Request: " + resource
    });
    return;
  }

  controller.update(id, req.body, function(err, result) {
    if (err) {
      res.json({
        confirmation: "fail",
        message: "Not Found"
      });
      return;
    }
    res.json({
      confirmation: "success",
      result: result
    });
  });
});

// CREATE call
router.post("/:resource", function(req, res, next) {
  var resource = req.params.resource;
  var controller = controllers[resource];

  if (controller == null) {
    res.json({
      confirmation: "fail",
      message: "Invalid Resource Request: " + resource
    });
    return;
  }
  
  var request = JSON.parse(req.body.params);
  controller.create(request, function(err, result) {
    if (err) {
      res.json({
        confirmation: "fail",
        message: err
      });
      return;
    }
    res.json({
      confirmation: "success",
      result: result
    });
  });
});

module.exports = router;
