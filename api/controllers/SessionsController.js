/*global User: true */
'use strict';

/**
 * SessionsController.js
 *
 */

var bcrypt = require('bcrypt');

module.exports = {
  create: function(req, res) {


    User.findOne().where({email: req.body.email}).then(function(user) {
      if (!user) return res.status(404).json({error: 'Invalid email or password'});

      bcrypt.compare(req.body.password, user.password, function(err, match) {
        if (err || !match) return res.status(404).json({error: 'Invalid email or password'});

        req.session.user = user.id;
        res.json({user: user.toJSON()});
      });
    }).catch(function() {
      return res.status(500).json({error: 'Databaase error'});
    });
  }
};
