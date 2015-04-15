/**
 * Compiles LESS files into CSS.
 *
 */
module.exports = function(grunt) {
  grunt.config.set('sass', {
    dev: {
      files: [
        {
          expand: true,
          cwd: 'assets/styles/pub/',
          src: ['importer.scss'],
          dest: '.tmp/public/styles/pub/',
          ext: '.css'
        },
        {
          expand: true,
          cwd: 'assets/styles/admin/',
          src: ['importer.scss'],
          dest: '.tmp/public/styles/admin/',
          ext: '.css'
        }
      ]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
};
