exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
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
