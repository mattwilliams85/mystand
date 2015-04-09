global.chai = require('chai');
var promised = require('chai-as-promised');
chai.use(promised);
global.expect = chai.expect;

global.protractorHelpers = {
  expectByCssToMatch: function(css, pattern) {
    browser
    .driver
    .findElement(by.css(css))
    .getText()
    .then(function(text) {
      expect(text).to.match(pattern);
    });
  }
};
