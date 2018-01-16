goog.provide('app.core.types.ApplicationFilterItem');

/**
 * @param {!app.core.ApplicationFilter|T} filter
 * @param {number=} opt_order
 * @constructor
 * @template T
 */
app.core.types.ApplicationFilterItem = function(filter, opt_order) {

  /**
   * @type {!app.core.ApplicationFilter|T}
   * @private
   */
  this.filter_ = filter;

  /**
   * @type {number}
   * @private
   */
  this.order_ = goog.isDefAndNotNull(opt_order) ? opt_order : 0;
};

/**
 * @return {!app.core.ApplicationFilter|T}
 */
app.core.types.ApplicationFilterItem.prototype.getFilter = function() {
  return this.filter_;
};

/**
 * @return {number}
 */
app.core.types.ApplicationFilterItem.prototype.getOrder = function() {
  return this.order_;
};
