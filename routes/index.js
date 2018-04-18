const express = require("express");
const router = express.Router();
const controllers = require("../controllers");
const nodemailer = require("nodemailer");
require("dotenv").config();

/* GET app page. */
router.get("/", function(req, res, next) {
  res.render("app", { title: "FSG" });
});

/* GET admin page. */
router.get("/admin", function(req, res, next) {
  res.render("admin-login", { title: "FSG Admin" });
});

/* GET quote page. */
router.get("/quote/:id", function(req, res, next) {
  const controller = controllers["quote"];
  controller.findById(req.params.id, function(err, result) {
    if (err) {
      res.render("error", { message: err.mesage, error: err });
      return;
    }
    const template = {
      title: "Estimated Quote",
      unitPrice: result.unitPrice
    };
    res.render("quote", template);
  });
});

/* GET test page. */
router.get("/test", function(req, res, next) {
  res.render("test", { title: "Test Page" });
});

/* POST call for email notification */
router.post("/email", function(req, res, next) {
  const request = JSON.parse(req.body.params);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASS
    }
  });
  const mailOptions = {
    from: request.email,
    to: process.env.NODEMAILER_RECEIVER,
    subject: "FSG Quote Request",
    html: `<!DOCTYPE html>
<html dir="ltr" lang="en-US">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        th,
        td {
            border: 1px solid black;
            padding: 8px;
        }
        th {
            text-align: right;
        }
    </style>
</head>
<body>
    <h1>Hello, ${request.name} has submitted a following quote.</h1>
    <hr/>
    <table style="width: auto">
        <tr>
            <th>Customer Name</th>
            <td>${request.name}</td>
        </tr>
        <tr>
            <th>Customer Email</th>
            <td>${request.email}</td>
        </tr>
        <tr>
            <th>Shirt Type</th>
            <td>${request.shirt}</td>
        </tr>
        <tr>
            <th>Shirt Color</th>
            <td>${request.color}</td>
        </tr>
        <tr>
            <th>Quantity</th>
            <td>
                XS: ${request.quantityModel.xs}
                <br/> S: ${request.quantityModel.s}
                <br/> M: ${request.quantityModel.m}
                <br/> L: ${request.quantityModel.l}
                <br/> XL: ${request.quantityModel.xl}
                <br/> XXL: ${request.quantityModel.xxl}
                <br/> XXXXL: ${request.quantityModel.xxxl}
                <br/>
            </td>
        </tr>
        <tr>
            <th>Total Quantity</th>
            <td>${request.quantityTotal}</td>
        </tr>
        <tr>
            <th>Customization</th>
            <td>${request.addonModel.selected}</td>
        </tr>
        <tr>
            <th>Rush Order</th>
            <td>${request.rushModel.selected}</td>
        </tr>
        <tr>
            <th>Additional Info</th>
            <td>${request.additional}</td>
        </tr>
        <tr>
            <th>Unit Price</th>
            <td>${request.unitPrice}</td>
        </tr>
        <tr>
            <th>Total Price</th>
            <td>${request.totalPrice}</td>
        </tr>
    </table>
</body>
</html>`
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      res.json({
        confirmation: "fail",
        message: error
      });
    } else {
      var data = "Email sent: " + info.response;
      res.json({
        confirmation: "success",
        result: data
      });
    }
  });
});

module.exports = router;
