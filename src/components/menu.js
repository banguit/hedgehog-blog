goog.provide('hedgehog.Menu');

goog.require('goog.array');
goog.require('goog.dom');
goog.require('goog.dom.classlist');
goog.require('goog.string');
goog.require('goog.ui.Component');

/**
 * @constructor
 * @extends {goog.ui.Component}
 */
hedgehog.Menu = function() {
  goog.ui.Component.call(this);
};
goog.inherits(hedgehog.Menu, goog.ui.Component);
goog.addSingletonGetter(hedgehog.Menu);

/** @inheritDoc */
hedgehog.Menu.prototype.createDom = function() {
  throw Error('Please use decorate(...) method, instead of render(...)');
};

/**
 * Set active menu item by route.
 */
hedgehog.Menu.prototype.setActiveMenuItem = function() {
  var navbar = this.getElement();
  var activeItems = goog.dom.getElementsByTagNameAndClass('a',
      hedgehog.Menu.CSS_CLASSES.ACTIVE, navbar);

  // If no active menu items
  if(!activeItems.length) {
      var menuItems =
          goog.dom.getElementsByTagNameAndClass('a', null, navbar);
      var currentLocation = window.location.href;

      goog.array.forEach(menuItems, function (item, index) {
          var className = goog.dom.classlist.get(item)[0];
          if(goog.string.contains(currentLocation, '/' + className + '/')) {
              goog.dom.classlist.add(item, hedgehog.Menu.CSS_CLASSES.ACTIVE);
          }
      });

      activeItems = goog.dom.getElementsByTagNameAndClass('a',
          hedgehog.Menu.CSS_CLASSES.ACTIVE, navbar);
      if(!activeItems.length) {
          goog.dom.classlist.add(menuItems[0],
              hedgehog.Menu.CSS_CLASSES.ACTIVE);
      }
  }
};

/** @enum {string} */
hedgehog.Menu.CSS_CLASSES = {
  ACTIVE: 'nav-current'
};