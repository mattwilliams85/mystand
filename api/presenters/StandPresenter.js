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
    title: obj.title,
    description: obj.description,
    image_original_url: obj.image_original_url,
    youtube: obj.youtube,
    goal: obj.goal,
    actions_count: obj.actions_count || 0,
    updates_count: obj.updates_count || 0,
    closed_at: obj.closed_at.getTime(),
  };
  // Category
  if (typeof obj.category === 'number') {
    data.category = obj.category;
  } else {
    data.category = obj.category.title;
  }
  // With Profile
  if (opts.withProfile) {
    data.duration = obj.duration;
    data.user = obj.user;
    data.is_public = obj.is_public;
    data.goal_result = obj.goal_result;
    if (obj.profile !== null && typeof obj.profile === 'object') {
      data.profile = {
        full_description: obj.profile.full_description
      };
    }
  }
  return data;
};
