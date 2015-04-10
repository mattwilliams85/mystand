// var seleniumPortAndPath = process.env.DISPLAY || ':4444/wd/hub';

exports.config = {
  seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
  // capabilities: {
  //   'browserName': 'chrome'
  // },
  capabilities: {
    'browserName': 'firefox'
  },
  specs: [
    'protractorHelpers.js',
    'protractor/**/*.js'
  ],
  framework:'mocha',
  mochaOpts: {
    reporter: 'spec',
    timeout: 30000
  },
  getPageTimeout: 30000,
  allScriptsTimeout: 30000
};
