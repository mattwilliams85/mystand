'use strict';

/*
 * StandPresenter.js
 *
*/

module.exports = function toJSON(opts) {
  opts = opts || {};
  var obj = this.toObject();
  var data = {
    id: obj.id,
    user: obj.user,
    title: obj.title,
    description: obj.description,
    image_original_url: obj.image_original_url,
    youtube: obj.youtube,
    goal: obj.goal,
    category: obj.category.title,
    actions_count: obj.actions_count || 0,
    updates_count: obj.updates_count || 0
  };
  if (opts.withProfile) {
    data.user = obj.user;
    if (obj.profile !== null && typeof obj.profile === 'object') {
      data.profile = {
        full_description: obj.profile.full_description
      };
    }
  }
  return data;
};
