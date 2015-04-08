'use strict';

/*
 * UserPresenter.js
 *
*/

module.exports = function toJSON(opts) {
  opts = opts || {};
  var obj = this.toObject();
  var data = {
    id: obj.id,
    first_name: obj.first_name,
    last_name: obj.last_name,
    image_original_url: obj.image_original_url || 'http://actualidadmedieval.com/img/avatar.png'
  };
  if (opts.publicProfile) {
    if (obj.profile !== null && typeof obj.profile === 'object') {
      data.bio = obj.profile.bio;
      data.website = obj.profile.website;
      data.stands_count = obj.profile.stands_count || 0;
      data.score = obj.profile.score || 0;
    }
  } else {
    data.email = obj.email;
  }
  return data;
};
