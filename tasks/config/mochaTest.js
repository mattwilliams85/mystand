module.exports = function(grunt) {

  grunt.config.set('mochaTest', {
    test: {
      options: {
        reporter: 'spec',
        require: 'test/helpers'
      },
      src: ['test/**/*Spec.js']
    }
  });

  grunt.loadNpmTasks('grunt-mocha-test');
};
