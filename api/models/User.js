/*
 * User.js
 *
*/

module.exports = {

  tableName: 'users',

  attributes: {
    first_name: {
      type: 'string'
    },
    last_name: {
      type: 'string'
    },
    image_original_url: {
      type: 'string'
    },
    email: {
      type: 'email',
      required: true
    },
    encrypted_password: {
      type: 'string'
    },

    /*
     * Instance methods
    */
    fullName: function() {
      return this.first_name + ' ' + this.last_name;
    }
  },

  // Seed data (only runs if Users count is 0)
  seedData: [
    {
      first_name: 'Sasha',
      last_name: 'Shamne',
      email: 'sasha.shamne@eyecuelab.com'
    }
  ]
};
