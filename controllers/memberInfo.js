var Person = require('../models/person');
var Post = require('../models/post');
module.exports = function(req, res, next) {
  if(req.session._id != null){
    Person.findOne({_id : req.session._id},function(err,user) {
      if (err) throw err;
      res.json(user);
    });
  }
};