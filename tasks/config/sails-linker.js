'use strict';

/**
 * Autoinsert script tags (or other filebased tags) in an html file.
 *
 * ---------------------------------------------------------------
 *
 * Automatically inject <script> tags for javascript files and <link> tags
 * for css files.  Also automatically links an output file containing precompiled
 * templates using a <script> tag.
 *
 * For usage docs see:
 * 		https://github.com/Zolmeister/grunt-sails-linker
 *
 */
module.exports = function(grunt) {

  grunt.config.set('sails-linker', {
    devJs: {
      options: {
        startTag: '<!--SCRIPTS-->',
        endTag: '<!--SCRIPTS END-->',
        fileTmpl: '<script src="%s"></script>',
        appRoot: '.tmp/public'
      },
      files: {
        // '.tmp/public/**/*.html': require('../pipeline').jsFilesToInject,
        'views/layout.ejs': require('../pipeline').jsFilesToInject,
        'views/layout-admin.ejs': require('../pipeline-admin').jsFilesToInject,
      }
    },

    devJsRelative: {
      options: {
        startTag: '<!--SCRIPTS-->',
        endTag: '<!--SCRIPTS END-->',
        fileTmpl: '<script src="%s"></script>',
        appRoot: '.tmp/public',
        relative: true
      },
      files: {
        // '.tmp/public/**/*.html': require('../pipeline').jsFilesToInject,
        // 'views/**/*.html': require('../pipeline').jsFilesToInject,
        'views/layout.ejs': require('../pipeline').jsFilesToInject,
        'views/layout-admin.ejs': require('../pipeline-admin').jsFilesToInject
      }
    },

    prodJs: {
      options: {
        startTag: '<!--SCRIPTS-->',
        endTag: '<!--SCRIPTS END-->',
        fileTmpl: '<script src="%s"></script>',
        appRoot: '.tmp/public'
      },
      files: {
        // '.tmp/public/**/*.html': ['.tmp/public/min/production.min.js'],
        // 'views/**/*.html': ['.tmp/public/min/production.min.js'],
        'views/layout.ejs': ['.tmp/public/pub/min/production.min.js'],
        'views/layout-admin.ejs': ['.tmp/public/admin/min/production.min.js'],
      }
    },

    prodJsRelative: {
      options: {
        startTag: '<!--SCRIPTS-->',
        endTag: '<!--SCRIPTS END-->',
        fileTmpl: '<script src="%s"></script>',
        appRoot: '.tmp/public',
        relative: true
      },
      files: {
        // '.tmp/public/**/*.html': ['.tmp/public/min/production.min.js'],
        // 'views/**/*.html': ['.tmp/public/min/production.min.js'],
        'views/layout.ejs': ['.tmp/public/pub/min/production.min.js'],
        'views/layout-admin.ejs': ['.tmp/public/admin/min/production.min.js']
      }
    },

    devStyles: {
      options: {
        startTag: '<!--STYLES-->',
        endTag: '<!--STYLES END-->',
        fileTmpl: '<link rel="stylesheet" href="%s">',
        appRoot: '.tmp/public'
      },

      files: {
        // '.tmp/public/**/*.html': require('../pipeline').cssFilesToInject,
        // 'views/**/*.html': require('../pipeline').cssFilesToInject,
        'views/layout.ejs': require('../pipeline').cssFilesToInject,
        'views/layout-admin.ejs': require('../pipeline-admin').cssFilesToInject,
      }
    },

    devStylesRelative: {
      options: {
        startTag: '<!--STYLES-->',
        endTag: '<!--STYLES END-->',
        fileTmpl: '<link rel="stylesheet" href="%s">',
        appRoot: '.tmp/public',
        relative: true
      },

      files: {
        // '.tmp/public/**/*.html': require('../pipeline').cssFilesToInject,
        // 'views/**/*.html': require('../pipeline').cssFilesToInject,
        'views/layout.ejs': require('../pipeline').cssFilesToInject,
        'views/layout-admin.ejs': require('../pipeline-admin').cssFilesToInject
      }
    },

    prodStyles: {
      options: {
        startTag: '<!--STYLES-->',
        endTag: '<!--STYLES END-->',
        fileTmpl: '<link rel="stylesheet" href="%s">',
        appRoot: '.tmp/public'
      },
      files: {
        // '.tmp/public/index.html': ['.tmp/public/min/production.min.css'],
        // 'views/**/*.html': ['.tmp/public/min/production.min.css'],
        'views/layout.ejs': ['.tmp/public/pub/min/production.min.css'],
        'views/layout-admin.ejs': ['.tmp/public/admin/min/production.min.css']
      }
    },

    prodStylesRelative: {
      options: {
        startTag: '<!--STYLES-->',
        endTag: '<!--STYLES END-->',
        fileTmpl: '<link rel="stylesheet" href="%s">',
        appRoot: '.tmp/public',
        relative: true
      },
      files: {
        // '.tmp/public/index.html': ['.tmp/public/min/production.min.css'],
        // 'views/**/*.html': ['.tmp/public/min/production.min.css'],
        'views/layout.ejs': ['.tmp/public/pub/min/production.min.css'],
        'views/layout-admin.ejs': ['.tmp/public/admin/min/production.min.css']
      }
    },

    // Bring in JST template object
    devTpl: {
      options: {
        startTag: '<!--TEMPLATES-->',
        endTag: '<!--TEMPLATES END-->',
        fileTmpl: '<script type="text/javascript" src="%s"></script>',
        appRoot: '.tmp/public'
      },
      files: {
        // '.tmp/public/index.html': ['.tmp/public/jst.js'],
        // 'views/**/*.html': ['.tmp/public/jst.js'],
        'views/layout.ejs': ['.tmp/public/pub/jst.js'],
        'views/layout-admin.ejs': ['.tmp/public/admin/jst.js']
      }
    }
  });

  grunt.loadNpmTasks('grunt-sails-linker');
};
