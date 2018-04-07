var express = require('express');
var router = express.Router();

/* GET app page. */
router.get('/', function(req, res, next) {
  res.render('app', { title: 'FSG' });
});

/* GET thankyou page. */
router.get('/thankyou', function(req, res, next) {
  res.render('thankyou', { title: 'FSG' });
});

/* GET test page. */
// router.get('/test', function(req, res, next) {
//   res.render('test', { title: 'Test Page' });
// });

module.exports = router;
