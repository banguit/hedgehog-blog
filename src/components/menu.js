goog.provide('hedgehog.Menu');

goog.require('goog.dom');
//goog.require('goog.dom.classlist');
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
  var parent = this.getElement();
  var activeItems = goog.dom.getElementsByTagNameAndClass('a',
      hedgehog.Menu.CSS_CLASSES.ACTIVE, parent);

  if(!activeItems.length) {

  }

  // var parent = this.getElement()[0]
  //     , menuItem = document.querySelector('a[data-controller="' + controllerName
  //     + '"]')
  //     , name = goog.dom.dataset.get(menuItem, 'name');
  //
  // this.currentName_ = goog.isDefAndNotNull(name) ? name : '';
  //
  // goog.array.forEach(goog.dom.getElementsByTagNameAndClass('a', null, parent),
  //     function (item, index) {
  //       goog.dom.classlist.remove(item, hedgehog.Menu.CSS_CLASSES.ACTIVE);
  //     });
  // goog.dom.classlist.add(menuItem, hedgehog.Menu.CSS_CLASSES.ACTIVE);
};

/** @enum {string} */
hedgehog.Menu.CSS_CLASSES = {
  ACTIVE: 'nav-current'
};