goog.provide('hedgehog.ResponsiveHeader');

goog.require('goog.dom');
goog.require('goog.dom.classlist');
goog.require('goog.events');
goog.require('goog.ui.Component');

/**
 * @constructor
 * @extends {goog.ui.Component}
 */
hedgehog.ResponsiveHeader = function () {
  hedgehog.ResponsiveHeader.base(this, 'constructor');

  /**
   * @type {Element}
   * @private
   */
  this.wrapper_ = goog.dom.getElementByClass('wrapper');
};
goog.inherits(hedgehog.ResponsiveHeader, goog.ui.Component);
goog.addSingletonGetter(hedgehog.ResponsiveHeader);

/** @inheritDoc */
hedgehog.ResponsiveHeader.prototype.createDom = function () {
  throw Error('Please use decorate(...) method, instead of render(...)');
};

/** @inheritDoc */
hedgehog.ResponsiveHeader.prototype.decorateInternal = function (element) {
  hedgehog.ResponsiveHeader.base(this, 'decorateInternal', element);
};

/** @inheritDoc */
hedgehog.ResponsiveHeader.prototype.enterDocument = function () {
  hedgehog.ResponsiveHeader.base(this, 'enterDocument');

  var el = this.getElement();
  var navbarToggle =
      goog.dom.getElementByClass(
          hedgehog.ResponsiveHeader.CSS_CLASSES.NAVBAR_TOGGLE, el);

  // Initialize events
  goog.events.listen(this.wrapper_, goog.events.EventType.CLICK,
      this.handleWrapperClick_, true, this);
  goog.events.listen(navbarToggle, goog.events.EventType.CLICK,
      this.handleClick_, false, this);
};

/**
 * Set title.
 * @param {string} pagetitle
 */
hedgehog.ResponsiveHeader.prototype.setTitle = function (pagetitle) {
  //navbar-text
  var title = goog.dom.getElementByClass(
      hedgehog.ResponsiveHeader.CSS_CLASSES.NAVBAR_TEXT, this.getElement());
  goog.dom.setTextContent(title, pagetitle);
};

/**
 * Handle click event on toggle icon.
 * @param {goog.events.BrowserEvent} e The click event.
 * @private
 */
hedgehog.ResponsiveHeader.prototype.handleClick_ = function (e) {
  goog.dom.classlist.toggle(this.wrapper_,
      hedgehog.ResponsiveHeader.CSS_CLASSES.RESPONSIVE_MENU);
};

/**
 * Handle click on wrapper.
 * @param {goog.events.BrowserEvent} e The click event.
 * @private
 */
hedgehog.ResponsiveHeader.prototype.handleWrapperClick_ = function (e) {
  var googDomClassList = goog.dom.classlist;
  if (e.target == this.wrapper_ && googDomClassList.contains(this.wrapper_,
          hedgehog.ResponsiveHeader.CSS_CLASSES.RESPONSIVE_MENU)) {
    googDomClassList.toggle(this.wrapper_,
        hedgehog.ResponsiveHeader.CSS_CLASSES.RESPONSIVE_MENU);
  }
};

/** @enum {string} */
hedgehog.ResponsiveHeader.CSS_CLASSES = {
  RESPONSIVE_MENU: 'responsive-menu',
  NAVBAR_TEXT: 'navbar-text',
  NAVBAR_TOGGLE: 'navbar-toggle'
};