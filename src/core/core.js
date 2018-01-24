/**
 * @fileoverview The Core class is the main place to specify MVC application
 * configuration.
 * @author Dmytro Antonenko <dmitry.antonenko@pubwebkit.com>
 */

goog.provide('app.Core');

goog.require('app.controllers.BlogController');
goog.require('app.core.Application');
goog.require('hedgehog.filters.ComponentsInitializationActionFilter');
goog.require('hedgehog.filters.ComponentsInitializationApplicationFilter');

/**
 * The base application class. All application settings should specified here.
 * This class will be exported as the main entry point.
 * @constructor
 * @extends {app.core.Application}
 */
app.Core = function() {
  app.Core.base(this, 'constructor');
};
goog.inherits(app.Core, app.core.Application);

/**
 * Initialize application.
 */
app.Core.prototype.init = function() {
  // -- Register routes -- //
  // this.mapRoute(route:string, controller:!Function);

  // Default route, specify other routes above this one
  this.mapRoute('*', app.controllers.BlogController);

  // -- Register application filters -- //
  // this.addApplicationFilter(filter:!app.core.ApplicationFilter,
  //     opt_order?:number);
  this.addApplicationFilter(new hedgehog.filters.ComponentsInitializationApplicationFilter());

  // -- Register action filters -- //
  // this.addActionFilter(filter:!app.core.ActionFilter,
  //     opt_route?:string|RegExp, opt_order?:number);
  this.addActionFilter(new hedgehog.filters.ComponentsInitializationActionFilter(), null, 0);

  // Run application.
  this.run();
};

goog.exportSymbol('app.Core', app.Core);
