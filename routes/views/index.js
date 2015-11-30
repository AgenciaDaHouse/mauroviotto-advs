var _ = require('underscore');
var async = require('async');
var keystone = require('keystone');

exports = module.exports = function (req, res) {
  var view = new keystone.View(req, res);

  // get model
  function getModel (name, next) {
    return keystone.list(name).model.find().sort('sortOrder').exec(next);
  }

  // initialize
  view.on('init', function (next) {
    async.parallel({
      abouts: function (next) { getModel('About', next); },
      roles: function (next) { getModel('Role', next); },
      members: function (next) { getModel('Member', next); }
    }, function (err, results) {
      if (err) throw new Error(err);

      var locals = res.locals;
      locals.abouts = results.abouts;
      locals.roles = _.indexBy(results.roles, 'key');
      locals.members = _.groupBy(results.members, 'role');

      next();
    });
  });

  // render
  view.render('index');
};
