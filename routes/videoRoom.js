var express = require('express');
var router = express.Router();
var Video = require('../model/video') ;
var Danmu = require('../model/danmu') ;
var Mark = require('../model/mark') ;
var User = require('../model/user') ;
var Q = require('q') ;

/* GET home page. */
router.get('/', function(req, res, next) {

    var data = {} ;
    if(req.session.username){
      Q.all([
        findVideo(req),findRelation(req)
      ]).spread(function(video,islike){
        data.video = video ;
        data.isLike = islike ;
        return res.send(data) ;
      });
    }else{
      findVideo(req).then(function(video){
        data.video = video ;
        data.isLike = false ;
        return res.send(data) ;
      }).fail(console.error);
    }

});
//利用promise解决深层嵌套的问题
function findVideo(req){
  var deferred = Q.defer();
  Video.findVideo(req.query,function(err,video) {
    var data = {};
    if (err) {
      deferred.reject(err);
    } else {
      data = video;
      deferred.resolve(data);
    }
  }) ;
  return deferred.promise;
}

function findRelation(req){
  var relationQuery = {
    video_id: req.query._id,
    username: req.session.username
  }
  var deferred = Q.defer();
  var data ;
  Mark.findRelation(relationQuery,function(err,relation){
    if(err){
      deferred.reject(err) ;
    }else {
      data = relation? true : false ;
      deferred.resolve(data) ;
    }
  });
  return deferred.promise;
}

//获取弹幕列表
router.get('/danmuList',function(req,res,next){

  Danmu.getDanmuList(req.query,function(err,list){
    if(err){
      return res.send(err) ;
    }else{
      return res.send(list) ;
    }
  }) ;

});
//添加弹幕
router.post('/addDanmu',function(req,res,next){

  var data = {
    content: req.body.content,
    video_id: req.body.video_id,
    replier_username: req.session.username,
    replier_nickname: req.session.nickname,
    font_type: req.body.font_type,
    danmu_type: req.body.danmu_type,
    color: req.body.color,
    play_time: req.body.play_time
  }

  console.log(data)
  Danmu.addOne(data,function(err,item){
    if(err){
      console.log(err)
      return res.send(err) ;
    }else{
      console.log(item)
      return res.send(item) ;
    }
  });

});
//标记喜欢
router.post('/addRelation',function(req,res){
  var videoQuery = {video_id:req.body.video_id} ;
  var mark = {
    username:req.session.username,
    video_id:req.body.video_id
  };
  var followerData = {
    username:req.body.author_username,
    way:"add"
  }
  var followingData = {
    username:req.session.username,
    way:"add"
  }
  Mark.addOne(mark,function(err,item){
    if(err){
      return res.send(err) ;
    }else{
      console.log(videoQuery) ;
      Video.updateFollower(videoQuery) ;
      User.updateFollwer(followerData,function(){});
      User.updateFollwing(followingData,function(){});
      return res.send(item) ;
    }
  });
});

router.post('/removeRelation',function(req,res){
  var videoQuery = req.body ;
  var mark = {
    username:req.session.username,
    video_id:req.body.video_id
  };
  var followerData = {
    username:req.body.author_username,
    way:"remove"
  }
  var followingData = {
    username:req.session.username,
    way:"remove"
  }
  Mark.remove(mark,function(err,item){
    if(err){
      return res.send(err) ;
    }else{
      Video.updateFollower(videoQuery) ;
      User.updateFollwer(followerData,function(){});
      User.updateFollwing(followingData,function(){});
      return res.send(item) ;
    }
  });
});

router.post('/isLikeVideo',function(req,res){
  var data = {} ;
  req.body.username = req.session.username ;
  Mark.findRelation(req.body,function(err,item){
    if(err){
      return res.send(err) ;
    }else{
      data.isLike = item?"like":"unlike" ;
      return res.send(data) ;
    }
  });
});

module.exports = router;

