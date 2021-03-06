var Person = require('../models/person');
var Post = require('../models/post');
var Reply = require('../models/reply');

module.exports = function(req, res, next) {
  if(req.query.find == 'all'){
    Post.find({}).populate('userid','-password').lean().exec(function(err, posts){
      if (err) throw err;
      posts.sort(function(a,b){
        return (b.updateTime - a.updateTime );
      });
      posts.map(function(obj) {
        if(obj.userid._id == req.session._id){
          obj.isMyPost = true;
        }else{
          obj.isMyPost = false;
        }
        obj.replyLen = obj.reply.length;
        obj.likeLen = obj.like.length;
        obj.iLike = obj.like.includes(req.session._id);
        delete obj.like;

        return obj;
      });
      res.json(posts);
    });
  }
  else if(req.query.find == 'newest'){
    Post.findOne({userid : req.query.userid, updateTime : req.query.updateTime}).populate('userid', '-password').lean().exec(function(err,post) {
      if (err) throw err;
      post.isMyPost = true;
      post.likeLen = post.like.length;
      post.replyLen = post.reply.length;
      post.iLike = post.like.includes(req.session._id);
      delete post.like;
      res.json(post);
    });
  }
  else if(req.query.find == 'reply'){
    Post.findOne({_id : req.query._id}).populate({path:'reply', populate: {path:'userid', select:'-password'}}).select('reply').exec(function(err,post) {
      if (err) throw err;
      res.json(post);
    });

  }
};
