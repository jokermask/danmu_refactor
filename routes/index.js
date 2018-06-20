var express = require('express');
var router = express.Router();
var Video = require('../model/video') ;
var User = require('../model/user') ;

/* GET home page. */
router.get('/', function(req, res, next) {
      return res.render('index',data);
});

module.exports = router;
