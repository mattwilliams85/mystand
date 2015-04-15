/**
 * Minify files with UglifyJS.
 *
 * ---------------------------------------------------------------
 *
 * Minifies client-side javascript `assets`.
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-uglify
 *
 */
module.exports = function(grunt) {

  grunt.config.set('uglify', {
    // dist: {
    //   src: ['.tmp/public/pub/concat/production.js'],
    //   dest: '.tmp/public/pub/min/production.min.js'
    // },
    // dist: {
    //   files: {
    //     '.tmp/public/pub/min/production.min.js': ['.tmp/public/pub/concat/production.js'],
    //     '.tmp/public/admin/min/production.min.js': ['.tmp/public/admin/concat/production.js']
    //   }
    // },
    pub: {
      src: ['.tmp/public/pub/concat/production.js'],
      dest: '.tmp/public/pub/min/production.min.js'
    },
    admin: {
      src: ['.tmp/public/admin/concat/production.js'],
      dest: '.tmp/public/admin/min/production.min.js'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
};
