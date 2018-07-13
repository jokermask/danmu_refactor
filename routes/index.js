var express = require('express');
var router = express.Router();
var Video = require('../model/video') ;
var User = require('../model/user') ;

/* GET home page. */
router.get('/', function(req, res, next) {
      return res.render('index',data);
});


router.get('/video', function(req, res, next) {
      Video.getAll(function(err,videoList) {
            console.log(videoList);
            if (err) {
                  res.send(err);
            } else {
                  res.send(videoList);
            }
      })
});

module.exports = router;
