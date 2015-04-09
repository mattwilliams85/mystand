'use strict';

describe('Landing page', function() {
  beforeEach(function() {
    browser.get('http://mystand-staging.herokuapp.com/');
  });

  it('should have a title', function() {
    expect(browser.getTitle()).to.eventually.eql('My Stand');
  });

  it('should have a content', function() {
    protractorHelpers.expectByCssToMatch('.inner-wrap', /Featured Stands/i);
    var featuredStands = element.all(by.repeater('stand in featuredStands'));
    expect(featuredStands.count()).to.eventually.eql(5 + 2); // 2 added by slick slider for UI

    protractorHelpers.expectByCssToMatch('.inner-wrap', /Trending Stands/i);
    var trendingStands = element.all(by.repeater('stand in trendingStands'));
    expect(trendingStands.count()).to.eventually.eql(3);
  });
});
