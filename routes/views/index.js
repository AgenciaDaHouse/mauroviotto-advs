var keystone = require('keystone');
var _ = require('underscore');

exports = module.exports = function(req, res) {
  var view = new keystone.View(req, res);
  var locals = res.locals;

  // get model
  function getModel (name, keyOrCallback, next) {
    return keystone
      .list(name)
      .model
      .find()
      .sort('sortOrder')
      .exec(_.isFunction(keyOrCallback) ? keyOrCallback :
        function (err, results) {
          locals[keyOrCallback] = results;
          next(err);
      });
  }

  view.on('init', function (next) {
    getModel('About', 'abouts', next);
  });

  view.render('index');
};
