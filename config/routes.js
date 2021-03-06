/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  *  If a request to a URL doesn't match any of the custom routes above, it  *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

  // Users
  'post /users.json': 'UsersController.create',
  'put /users/:id.json': 'UsersController.update',
  'get /users/:id.json': 'UsersController.show',

  // User profiles
  'get /profile.json': 'ProfilesController.show',

  // User notifications
  'get /users/:userId/notifications.json': 'UserNotificationsController.show',
  'put /users/:userId/notifications.json': 'UserNotificationsController.update',

  // Sessions
  'post /login.json': 'SessionsController.create',
  'delete /login.json': 'SessionsController.destroy',

  // Categories
  'get /categories.json': 'CategoriesController.index',

  // Stands
  'get /stands.json': 'StandsController.index',
  'get /stands/:id.json': 'StandsController.show',
  'post /stands.json': 'StandsController.create',
  'put /stands/:id/publish.json': 'StandsController.publish',
  'put /stands/:id/unpublish.json': 'StandsController.unpublish',
  'put /stands/:id/close.json': 'StandsController.close',
  'put /stands/:id.json': 'StandsController.update',
  'delete /stands/:id.json': 'StandsController.destroy',
  'get /featured-stands.json': 'FeaturedStandsController.index',
  'get /trending-stands.json': 'TrendingStandsController.index',

  // Stand Updates
  'get /stands/:standId/updates.json': 'StandUpdatesController.index',
  'post /stands/:standId/updates.json': 'StandUpdatesController.create',

  // Stand Actions
  'get /stands/:standId/actions.json': 'StandActionsController.index',
  'post /stands/:standId/actions.json': 'StandActionsController.create',

  // Stand Bookmarks
  'get /users/:userId/bookmarks.json': 'StandBookmarksController.index',
  'post /stands/:standId/bookmarks.json': 'StandBookmarksController.create',

  // User Stands
  'get /users/:userId/stands.json': 'UserStandsController.index',
  'get /users/:userId/stands/activity.json': 'UserStandsController.activity',

  // Flags
  'post /flags.json': 'FlagsController.create',

  // Media Uploader config
  'get /uploader-config.json': 'MediaController.uploaderConfig',

  // Facebook auth
  'get /auth/facebook': 'SessionsController.facebook',
  'get /auth/facebook/callback': 'SessionsController.facebookCallback',

  // Google auth
  'get /auth/google': 'SessionsController.google',
  'get /auth/google/callback': 'SessionsController.googleCallback',


  /**
   * Admin routes
   *
   */
  '/admin*': {
    view: 'index',
    locals: {
      layout: 'layout-admin'
    },
    skipAssets: true
  },

  // Users
  'get /admin/users.json': 'admin/AdminUsersController.index',
  // 'get /admin/users/:id.json': 'admin/AdminUsersController.show',
  // 'post /admin/users.json': 'admin/AdminUsersController.create',
  // 'put /admin/users/:id.json': 'admin/AdminUsersController.update',


  // All other non asset routes will render a default layout with no content
  '*': {
    view: 'index',
    skipAssets: true
  }
};
