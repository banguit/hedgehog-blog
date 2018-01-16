/**
 * @fileoverview HomeController class.
 * @author Dmytro Antonenko <dmitry.antonenko@pubwebkit.com>
 */

goog.provide('app.controllers.HomeController');

goog.require('app.core.Controller');


/**
 * Home controller.
 * @constructor
 * @extends {app.core.Controller}
 */
app.controllers.HomeController = function() {
  app.controllers.HomeController.base(this, 'constructor', 'HomeController');
};
goog.inherits(app.controllers.HomeController, app.core.Controller);

/**
 * index action.
 * @param {app.core.Request} request
 * @param {app.core.Response} response
 */
app.controllers.HomeController.prototype.index = function(request, response) {
  console.log('Hello Amigo!');
};

// Export actions.
goog.exportProperty(app.controllers.HomeController.prototype, 'index',
    app.controllers.HomeController.prototype.index);
