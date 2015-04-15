/**
 * Compress CSS files.
 *
 * ---------------------------------------------------------------
 *
 * Minifies css files and places them into .tmp/public/min directory.
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-cssmin
 */
module.exports = function(grunt) {

  grunt.config.set('cssmin', {
    // dist: {
    // 	src: ['.tmp/public/concat/production.css'],
    // 	dest: '.tmp/public/min/production.min.css'
    // },
    pub: {
      src: ['.tmp/public/pub/concat/production.css'],
      dest: '.tmp/public/pub/min/production.min.css'
    },
    admin: {
      src: ['.tmp/public/admin/concat/production.css'],
      dest: '.tmp/public/admin/min/production.min.css'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-cssmin');
};
