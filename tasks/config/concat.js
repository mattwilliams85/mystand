/**
 * Concatenate files.
 *
 * ---------------------------------------------------------------
 *
 * Concatenates files javascript and css from a defined array. Creates concatenated files in
 * .tmp/public/contact directory
 * [concat](https://github.com/gruntjs/grunt-contrib-concat)
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-concat
 */
module.exports = function(grunt) {

  grunt.config.set('concat', {
    jsPub: {
      src: require('../pipeline').jsFilesToInjectPub,
      dest: '.tmp/public/pub/concat/production.js'
    },
    cssPub: {
      src: require('../pipeline').cssFilesToInjectPub,
      dest: '.tmp/public/pub/concat/production.css'
    },

    jsAdmin: {
      src: require('../pipeline-admin').jsFilesToInjectPub,
      dest: '.tmp/public/admin/concat/production.js'
    },
    cssAdmin: {
      src: require('../pipeline-admin').cssFilesToInjectPub,
      dest: '.tmp/public/admin/concat/production.css'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
};
