'use strict';

/*
 * FeaturedStandPresenter.js
 *
*/

module.exports = function toJSON(opts) {
  var obj = this.toObject();
  return {
    id: obj.id,
    stand_id: obj.stand.id,
    position: obj.position,
    title: obj.stand.title,
    description: obj.stand.description,
    image_original_url: obj.stand.image_original_url,
    youtube: obj.stand.youtube,
    goal: obj.stand.goal,
    category: obj.category.title,
    actions_count: obj.stand.actions_count || 0
  };
};
