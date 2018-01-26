goog.provide('hedgehog.filters.ComponentsInitializationActionFilter');

goog.require('app.core.ActionFilter');

/**
 * @constructor
 * @implements {app.core.ActionFilter}
 */
hedgehog.filters.ComponentsInitializationActionFilter = function () {
  // Initialize components
};

/** @override */
hedgehog.filters.ComponentsInitializationActionFilter.prototype.onActionExecuting = function (e) {

};

/** @override */
hedgehog.filters.ComponentsInitializationActionFilter.prototype.onActionExecuted = function (e) {
};

/** @override */
hedgehog.filters.ComponentsInitializationActionFilter.prototype.onException = function (e) {
  console.error(e);
};
