goog.provide('app.core.types.ActionFilterItem');

goog.require('app.core.ActionFilter');
goog.require('app.core.types.ApplicationFilterItem');

/**
 * @param {!app.core.ActionFilter} filter
 * @param {string|RegExp=} opt_route Route to watch for.
 * @param {number=} opt_order
 * @constructor
 * @extends {app.core.types.ApplicationFilterItem}
 */
app.core.types.ActionFilterItem = function(filter, opt_route, opt_order) {
  app.core.types.ActionFilterItem.base(this, 'constructor', filter, opt_order);

  /**
   * @type {string|RegExp}
   * @private
   */
  this.route_ = goog.isDefAndNotNull(opt_route) ? opt_route : '';
};
goog.inherits(app.core.types.ActionFilterItem,
    app.core.types.ApplicationFilterItem);

/**
 * @return {string|RegExp}
 */
app.core.types.ActionFilterItem.prototype.getRoute = function() {
  return this.route_;
};
