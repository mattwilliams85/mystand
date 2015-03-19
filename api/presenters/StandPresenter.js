'use strict';

/*
 * StandPresenter.js
 *
*/

module.exports = function toJSON(opts) {
  var obj = this.toObject();
  return {
    id: obj.id,
    title: obj.title,
    description: obj.description,
    image_original_url: obj.image_original_url,
    youtube: obj.youtube,
    goal: obj.goal,
    category: obj.category.title,
    actions_count: obj.actions_count || 0
  };
};
