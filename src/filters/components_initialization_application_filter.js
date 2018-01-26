goog.provide('hedgehog.filters.ComponentsInitializationApplicationFilter');

goog.require('app.core.ApplicationFilter');
goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.string');
goog.require('hedgehog.Menu');
goog.require('hedgehog.ResponsiveHeader');
goog.require('hedgehog.Share');

/**
 * @constructor
 * @implements {app.core.ApplicationFilter}
 */
hedgehog.filters.ComponentsInitializationApplicationFilter = function() {
  /**
   * @type {hedgehog.ResponsiveHeader}
   * @private
   */
  this.responsiveHeader_ = hedgehog.ResponsiveHeader.getInstance();

  /**
   * @type {hedgehog.Menu}
   * @private
   */
  this.menu_ = hedgehog.Menu.getInstance();

  /**
   * @type {hedgehog.Share}
   * @private
   */
  this.shareComponent_ = new hedgehog.Share();
};

/** @override */
hedgehog.filters.ComponentsInitializationApplicationFilter.prototype.onApplicationStart = function() {
  // Initialize UI components
  this.responsiveHeader_.decorate(
      goog.dom.getElementByClass('page-responsive-header'));
  this.menu_.decorate(goog.dom.getElementByTagNameAndClass('ul', 'navbar-nav',
      document.querySelector('header nav.navbar')));
};

/** @override */
hedgehog.filters.ComponentsInitializationApplicationFilter.prototype.onApplicationRun = function(e) {
  this.menu_.setActiveMenuItem();
};

/** @override */
hedgehog.filters.ComponentsInitializationApplicationFilter.prototype.onApplicationLoaded = function() {

  // Render post share buttons.
  var shareContainer = goog.dom.getElementByClass('share');
  if (shareContainer) {
    this.shareComponent_.render(shareContainer);
  }

  // Initialize post back link.
  this.fixPostBackLink_();
};

/**
 * Initialize post back link.
 * @private
 */
hedgehog.filters.ComponentsInitializationApplicationFilter.prototype.
    fixPostBackLink_ = function() {
  var backlink = goog.dom.getElementByClass('back-link');
  if (backlink) {
    if (goog.string.contains(document.referrer, window.location.host)) {
      goog.events.listen(backlink, goog.events.EventType.CLICK, function() {
        window.history.back();
      });
    } else {
      var backLinkContent = goog.dom.getElementByTagNameAndClass('span', null,
          backlink);
      //goog.dom.setTextContent(backLinkContent, ' Go to homepage');
      backLinkContent.innerHTML = ' <i class="fa fa-home"></i> Home';
      backlink.setAttribute('href', window.location.origin);
    }
  }
};
