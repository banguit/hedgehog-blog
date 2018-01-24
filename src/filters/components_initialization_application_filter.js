goog.provide('hedgehog.filters.ComponentsInitializationApplicationFilter');

goog.require('app.core.ApplicationFilter');
goog.require('goog.dom');
goog.require('hedgehog.Menu');
goog.require('hedgehog.ResponsiveHeader');

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
};

/** @override */
hedgehog.filters.ComponentsInitializationApplicationFilter.prototype.
    onApplicationStart = function() {
  // Initialize UI components
  this.responsiveHeader_.decorate(
      goog.dom.getElementByClass('page-responsive-header'));
  this.menu_.decorate(goog.dom.getElementByTagNameAndClass('nav', 'navbar',
      document.querySelector('div.wrapper header.container')));
};

/** @override */
hedgehog.filters.ComponentsInitializationApplicationFilter.prototype.
    onApplicationRun = function(e) {
  console.log(e);
  this.menu_.setActiveMenuItem();
};

/** @override */
hedgehog.filters.ComponentsInitializationApplicationFilter.prototype.
    onApplicationLoaded = function() {
};