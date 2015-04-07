'use strict';

module.exports = function (job, done) {
  sails.log.info('processing signUpEmailConfirmation ----------', job.data);

  var AWS = sails.config.AWS,
      ses = new AWS.SES(),
      sesParams = {
        Destination: {
          ToAddresses: [job.data.email]
        },
        Message: {
          Body: {
            Text: {
              Data: 'Thanks for signing up for a MyStand account!\n\n' +
                    'Now you can Take Action.',
            }
          },
          Subject: {
            Data: 'MyStand sign up confirmation',
          }
        },
        Source: 'sasha.shamne@eyecuelab.com',
        ReturnPath: 'sasha.shamne@eyecuelab.com'
      };
  ses.sendEmail(sesParams, function(err) {
    if (err) {
      sails.log.error(err, err.stack);

      return done(err);
    }

    done();
  });
};
