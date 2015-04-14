'use strict';

/*
 * UserPresenter.js
 *
*/

module.exports = function toJSON(opts) {
  opts = opts || {};

  var data = {
    id: this.id,
    first_name: this.first_name,
    last_name: this.last_name,
    image_original_url: this.image_original_url || 'http://actualidadmedieval.com/img/avatar.png'
  };

  if (opts.privateProfile) {
    data.email = this.email;
    data.is_admin = !!this.is_admin;
  }

  if (opts.publicProfile) {
    if (this.profile !== null && typeof this.profile === 'object') {
      data.bio = this.profile.bio;
      data.website = this.profile.website;
      data.stands_count = this.profile.stands_count || 0;
      data.score = this.profile.score || 0;
    }
  }

  return data;
};
