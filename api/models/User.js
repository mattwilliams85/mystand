/*
 * User.js
 *
*/

module.exports = {
  attributes: {
    firstName: {
      type: 'string'
    },
    lastName: {
      type: 'string'
    }
  },

  // Seed data (only runs if User count is 0)
  seedData: [
    {
      firstName: 'Bob',
      lastName: 'Smith'
    }
  ]
};
