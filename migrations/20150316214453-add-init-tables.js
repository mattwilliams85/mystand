'use strict';

// var dbm = global.dbm || require('db-migrate');
// var type = dbm.dataType;

exports.up = function(db, callback) {
  async.series([
    db.createTable.bind(db, 'categories', {
      id: { type: 'int', primaryKey: true, autoIncrement: true },
      title: { type: 'string' },
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
      title: { type: 'string' },
      image_original_url: { type: 'string' },
      youtube: { type: 'string' },
      description: { type: 'text' },
      goal_result: { type: 'text' },
      goal: { type: 'int' },
      actions_count: { type: 'int' },
      duration: { type: 'int' },
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

    db.createTable.bind(db, 'stand_flags', {
      id: { type: 'int', primaryKey: true, autoIncrement: true },
      user: { type: 'int' },
      stand: { type: 'int' },
      createdAt: { type: 'timestamp' },
      updatedAt: { type: 'timestamp' }
    }),

    db.createTable.bind(db, 'stand_profiles', {
      id: { type: 'int', primaryKey: true, autoIncrement: true },
      stand: { type: 'int' },
      full_description: { type: 'text' },
      petition: { type: 'text' },
      createdAt: { type: 'timestamp' },
      updatedAt: { type: 'timestamp' }
    }),

    db.createTable.bind(db, 'stand_updates', {
      id: { type: 'int', primaryKey: true, autoIncrement: true },
      stand: { type: 'int' },
      text: { type: 'text' },
      createdAt: { type: 'timestamp' },
      updatedAt: { type: 'timestamp' }
    }),

    db.createTable.bind(db, 'users', {
      id: { type: 'int', primaryKey: true, autoIncrement: true },
      first_name: { type: 'string' },
      last_name: { type: 'string' },
      image_original_url: { type: 'string' },
      email: { type: 'string' },
      encrypted_password: { type: 'string' },
      is_admin: { type: 'boolean' },
      createdAt: { type: 'timestamp' },
      updatedAt: { type: 'timestamp' }
    }),
    db.addIndex.bind(db, 'users', 'users_email_key', ['email'], true),

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
