module.exports = function(grunt) {

  grunt.config.set('mochaTest', {
    test: {
      options: {
        reporter: 'spec',
        require: 'test/helpers',
        timeout: 50000,
        recursive: true
      },
      src: ['test/hooks.js', 'test/**/*Spec.js']
    }
  });

  grunt.loadNpmTasks('grunt-mocha-test');
};
