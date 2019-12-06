var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/home', function(req, res, next) {
  res.send('respond with a resource');
  res.render('home', { title: 'Express' });
});

module.exports = router;
