/**
 * @fileoverview Base controller class.
 * @author Dmytro Antonenko <dmitry.antonenko@pubwebkit.com>
 */

goog.provide('app.core.Controller');

/**
 * Defines an abstract controller for handling requests to certain fragments.
 * @param {string} controllerName Current
 * @constructor
 */
app.core.Controller = function(controllerName) {

  /**
   * @type {string}
   * @private
   */
  this.controllerName_ = controllerName;
};

/**
 * Get current controller name
 * @return {string}
 */
app.core.Controller.prototype.getControllerName = function() {
  return this.controllerName_;
};
