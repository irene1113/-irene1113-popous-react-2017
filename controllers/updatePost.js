var Person = require('../models/person');
var Post = require('../models/post');

module.exports = function(req, res, next) {
  Post.findOneAndUpdate({ _id: req.body._id }, req.body, function(err) {
    if (err) throw err;
  });
};
