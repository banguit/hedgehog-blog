/**
 * @fileoverview HomeController class.
 * @author Dmytro Antonenko <dmitry.antonenko@pubwebkit.com>
 */

goog.provide('app.controllers.BlogController');

goog.require('app.core.Controller');


/**
 * Blog controller.
 * @constructor
 * @extends {app.core.Controller}
 */
app.controllers.BlogController = function() {
  app.controllers.BlogController.base(this, 'constructor', 'BlogController');
};
goog.inherits(app.controllers.BlogController, app.core.Controller);

/**
 * index action.
 * @param {app.core.Request} request
 * @param {app.core.Response} response
 */
app.controllers.BlogController.prototype.index = function(request, response) {
};

// Export actions.
goog.exportProperty(app.controllers.BlogController.prototype, 'index',
    app.controllers.BlogController.prototype.index);
