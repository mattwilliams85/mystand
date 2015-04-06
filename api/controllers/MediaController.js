/*global User: true */
'use strict';

/**
 * MediaController.js
 *
 */

var uuid = require('node-uuid');
var crypto = require('crypto');

module.exports = {

  /**
   * @api {get} /uploader-config Get Direct Uploader Config
   * @apiName GetDirectUploderConfig
   * @apiGroup Media
   *
   * @apiSuccess {Object} config Config object
   * @apiSuccess {String} config.key Key
   * @apiSuccess {String} config.awsAccessKeyId AWS Access Key Id
   * @apiSuccess {String} config.s3Policy S3 Policy
   * @apiSuccess {String} config.s3Signature S3 Signature
   * @apiSuccess {String} config.s3Bucket S3 Bucket
   *
   * @apiSuccessExample Success-Response:
   *   HTTP/1.1 200 OK
   *   {
   *     "config": {
   *       "key": "uploads/abc/${filename}",
   *       "awsAccessKeyId": "abc",
   *       "s3Policy": "abc",
   *       "s3Signature": "abc",
   *       "s3Bucket": "bucketname"
   *     }
   *   }
   */
  uploaderConfig: function(req, res) {
    User.auth(req.session.user, function(err) {
      if (err) return res.forbidden();

      var bucket = process.env.AWS_S3_BUCKET_NAME,
          awsAccessKeyId = process.env.AWS_ACCESS_KEY_ID,
          awsSecretAccessKeyId = process.env.AWS_SECRET_ACCESS_KEY_ID,
          today = new Date(),
          dir = uuid.v4(),
          policy = {
            expiration: '' + (today.getUTCFullYear()) + '-' + (today.getUTCMonth() + 1) + '-' + (today.getUTCDate()) + 'T' + (today.getUTCHours() + 1) + ':' + (today.getUTCMinutes()) + ':' + (today.getUTCSeconds()) + 'Z',
            conditions: [
              ['starts-with', '$key', 'uploads/' + dir + '/'],
              {bucket: bucket},
              {acl: 'public-read'},
              {success_action_status:'201'},
              ['content-length-range', 1, 104857600]
            ]
          },
          base64Policy = new Buffer(JSON.stringify(policy), 'utf-8').toString('base64'),
          credentials = {
            key: 'uploads/' + dir + '/${filename}',
            awsAccessKeyId: awsAccessKeyId,
            s3Policy: new Buffer(JSON.stringify(policy)).toString('base64'),
            s3Signature: crypto.createHmac('sha1', awsSecretAccessKeyId).update(base64Policy).digest('base64'),
            s3Bucket: bucket
          };

      res.json({config: credentials});
    });
  }
};
