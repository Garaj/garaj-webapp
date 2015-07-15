'use strict';

var User = require('./user.model');
var passport = require('passport');
var request = require('request');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');

var validationError = function(res, err) {
  return res.json(422, err);
};

var getPhotoUrlWithFacebookUsername = function (username, callback) {
  request({
    url: 'http://www.facebook.com/' + username,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.132 Safari/537.36'
    }
  }, function (err, resp) {
    if (!err && resp.statusCode === 200) {

      var url = resp.body.match(/profile_id=(\d*)/gi),
          id = url[0].replace('profile_id=', '');

      if(!id) {
        url = resp.body.match(/entity_id":"(\d*)"}/gi);
        id = url[0].replace('entity_id":"','').replace('"}','');
      }
      console.log(url);
      console.log(id);
      callback('http://graph.facebook.com/' + id + '/picture?type=large');
    } else {
      callback(false);
    }
  });
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User.find({}, '-salt -hashedPassword', function (err, users) {
    if(err) return res.send(500, err);
    res.json(200, users);
  });
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  getPhotoUrlWithFacebookUsername(newUser.fb_username, function (url) {
    if(url) {
      newUser.photo_url = url;
    }

    newUser.save(function(err, user) {
      if (err) return validationError(res, err);
      var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
      res.json({ token: token });
    });
  });
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);
    res.json(user.profile);
  });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if(err) return res.send(500, err);
    return res.send(204);
  });
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};

/**
 * Change a users photo
 */
exports.changePhoto = function(req, res, next) {
  var userId = req.user._id;
  var fbUsername = String(req.body.fb_username);
  getPhotoUrlWithFacebookUsername(fbUsername, function (url) {
    if(url) {
      User.findById(userId, function (err, user) {
        user.photo_url = url;
        user.save(function(err) {
          if (err) return validationError(res, err);
          res.send(user);
        });
      });
    } else {
      res.send(403);
    }
  });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.json(401);
    res.json(user);
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
