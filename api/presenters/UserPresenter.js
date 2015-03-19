'use strict';

/*
 * UserPresenter.js
 *
*/

module.exports = function toJSON(opts) {
  var obj = this.toObject();
  return {
    id: obj.id,
    email: obj.email,
    first_name: obj.first_name,
    last_name: obj.last_name
  };
};
