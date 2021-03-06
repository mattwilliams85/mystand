'use strict';

// var dbm = global.dbm || require('db-migrate');
// var type = dbm.dataType;

exports.up = function(db, callback) {
  async.series([
    db.createTable.bind(db, 'categories', {
      id: { type: 'int', primaryKey: true, autoIncrement: true },
      title: { type: 'string' },
      position: { type: 'int' },
      createdAt: { type: 'timestamp' },
      updatedAt: { type: 'timestamp' }
    }),

    db.createTable.bind(db, 'featured_stands', {
      id: { type: 'int', primaryKey: true, autoIncrement: true },
      stand: { type: 'int' },
      category: { type: 'int' },
      position: { type: 'int' },
      createdAt: { type: 'timestamp' },
      updatedAt: { type: 'timestamp' }
    }),

    db.createTable.bind(db, 'stands', {
      id: { type: 'int', primaryKey: true, autoIncrement: true },
      user: { type: 'int' },
      category: { type: 'int' },
      profile: { type: 'int' },
      title: { type: 'string' },
      image_original_url: { type: 'string' },
      youtube: { type: 'string' },
      description: { type: 'text' },
      goal_result: { type: 'text' },
      goal: { type: 'int' },
      actions_count: { type: 'int', defaultValue: 0 },
      updates_count: { type: 'int', defaultValue: 0 },
      duration: { type: 'int' },
      closed_at: { type: 'timestamp' },
      is_public: { type: 'boolean' },
      createdAt: { type: 'timestamp' },
      updatedAt: { type: 'timestamp' }
    }),

    db.createTable.bind(db, 'sharings', {
      id: { type: 'int', primaryKey: true, autoIncrement: true },
      uuid: { type: 'string' },
      user: { type: 'int' },
      stand: { type: 'int' },
      createdAt: { type: 'timestamp' },
      updatedAt: { type: 'timestamp' }
    }),

    db.createTable.bind(db, 'stand_actions', {
      id: { type: 'int', primaryKey: true, autoIncrement: true },
      user: { type: 'int' },
      stand: { type: 'int' },
      image_original_url: { type: 'string' },
      youtube: { type: 'string' },
      description: { type: 'text' },
      createdAt: { type: 'timestamp' },
      updatedAt: { type: 'timestamp' }
    }),

    db.createTable.bind(db, 'stand_bookmarks', {
      id: { type: 'int', primaryKey: true, autoIncrement: true },
      user: { type: 'int' },
      stand: { type: 'int' },
      createdAt: { type: 'timestamp' },
      updatedAt: { type: 'timestamp' }
    }),

    db.createTable.bind(db, 'stand_comments', {
      id: { type: 'int', primaryKey: true, autoIncrement: true },
      user: { type: 'int' },
      stand: { type: 'int' },
      parent: { type: 'int' },
      text: { type: 'text' },
      createdAt: { type: 'timestamp' },
      updatedAt: { type: 'timestamp' }
    }),

    db.createTable.bind(db, 'flags', {
      id: { type: 'int', primaryKey: true, autoIncrement: true },
      user: { type: 'int' },
      content: { type: 'json' },
      content_id: { type: 'int' },
      content_type: { type: 'string' },
      createdAt: { type: 'timestamp' },
      updatedAt: { type: 'timestamp' }
    }),

    db.createTable.bind(db, 'stand_profiles', {
      id: { type: 'int', primaryKey: true, autoIncrement: true },
      stand: { type: 'int' },
      full_description: { type: 'text' },
      createdAt: { type: 'timestamp' },
      updatedAt: { type: 'timestamp' }
    }),

    db.createTable.bind(db, 'stand_updates', {
      id: { type: 'int', primaryKey: true, autoIncrement: true },
      stand: { type: 'int' },
      title: { type: 'string' },
      text: { type: 'text' },
      createdAt: { type: 'timestamp' },
      updatedAt: { type: 'timestamp' }
    }),

    db.createTable.bind(db, 'users', {
      id: { type: 'int', primaryKey: true, autoIncrement: true },
      profile: { type: 'int' },
      first_name: { type: 'string' },
      last_name: { type: 'string' },
      image_original_url: { type: 'string' },
      email: { type: 'string' },
      encrypted_password: { type: 'string' },
      is_admin: { type: 'boolean' },
      facebook_id: { type: 'string' },
      google_id: { type: 'string' },
      createdAt: { type: 'timestamp' },
      updatedAt: { type: 'timestamp' }
    }),
    db.addIndex.bind(db, 'users', 'users_email_key', ['email'], true),
    db.addIndex.bind(db, 'users', 'users_facebook_id_key', ['facebook_id'], true),
    db.addIndex.bind(db, 'users', 'users_google_id_key', ['google_id'], true),

    db.createTable.bind(db, 'user_notifications', {
      id: { type: 'int', primaryKey: true, autoIncrement: true },
      user: { type: 'int' },
      announcements: { type: 'boolean' },
      updates: { type: 'boolean' },
      comments: { type: 'boolean' },
      actions: { type: 'boolean' },
      social: { type: 'boolean' },
      createdAt: { type: 'timestamp' },
      updatedAt: { type: 'timestamp' }
    }),

    db.createTable.bind(db, 'user_profiles', {
      id: { type: 'int', primaryKey: true, autoIncrement: true },
      user: { type: 'int' },
      bio: { type: 'string' },
      website: { type: 'string' },
      stands_count: { type: 'int' },
      score: { type: 'int' },
      createdAt: { type: 'timestamp' },
      updatedAt: { type: 'timestamp' }
    }),
  ], callback);
};

exports.down = function(db, callback) {
  async.series([
    db.dropTable.bind(db, 'categories'),
    db.dropTable.bind(db, 'featured_stands'),
    db.dropTable.bind(db, 'stands'),
    db.dropTable.bind(db, 'sharings'),
    db.dropTable.bind(db, 'stand_actions'),
    db.dropTable.bind(db, 'stand_bookmarks'),
    db.dropTable.bind(db, 'stand_comments'),
    db.dropTable.bind(db, 'stand_flags'),
    db.dropTable.bind(db, 'stand_profiles'),
    db.dropTable.bind(db, 'stand_updates'),
    db.dropTable.bind(db, 'users'),
    db.dropTable.bind(db, 'user_notifications'),
    db.dropTable.bind(db, 'user_profiles')
  ], callback);
};
