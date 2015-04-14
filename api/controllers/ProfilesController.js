/*global User: true, UserProfile: true */
'use strict';

/**
 * ProfilesController.js
 *
 */

module.exports = {

  /**
   * @api {get} /profile Get Current User's Profile
   * @apiName GetProfile
   * @apiGroup Users
   *
   * @apiSuccess {Object} user User object
   * @apiSuccess {Number} user.id User ID
   * @apiSuccess {String} user.first_name First name
   * @apiSuccess {String} user.last_name Last name
   * @apiSuccess {String} user.image_original_url Profile Image
   * @apiSuccess {String} user.website Website
   * @apiSuccess {Number} user.stands_count Created stands count
   * @apiSuccess {Number} user.score Activism score
   * @apiSuccess {String} user.bio Bio
   * @apiSuccess {String} user.email Email
   * @apiSuccess {Boolean} user.is_admin Is Admin
   *
   * @apiSuccessExample Success-Response:
   *   HTTP/1.1 200 OK
   *   {
   *     "user": {
   *       "id": 123,
   *       "first_name": "Bob",
   *       "last_name": "White",
   *       "image_original_url": "http://example.com/image.jpg",
   *       "website": "http://www.google.com/",
   *       "stands_count": 5,
   *       "score": 100,
   *       "bio": "Bio here ...",
   *       "email": "email@example.com",
   *       "is_admin": true
   *     }
   *   }
   */
  show: function(req, res) {
    User.auth(req.session.user, function(err, currentUser) {
      if (err) return res.forbidden();

      UserProfile.findOne({user: currentUser.id}).exec(function(err, userProfile) {
        if (err) return res.status(500).json({error: 'Database error'});

        if (userProfile) currentUser.profile = userProfile;

        var userData = currentUser.toJSON({privateProfile: true, publicProfile: true});
        res.json({user: userData});
      });
    });
  }
};
