goog.provide('app.core.Response');

goog.require('app.core.Router');
goog.require('goog.soy');

/**
 * Create a response based on the provided request.
 * @param {app.core.Request} request
 * @param {app.core.Router} router
 * @constructor
 */
app.core.Response = function(request, router) {
  /**
   * @type {app.core.Request}
   * @private
   */
  this.request_ = request;

  /**
   * @type {app.core.Router}
   * @private
   */
  this.router_ = router;
};

/**
 * @return {app.core.Router}
 */
app.core.Response.prototype.getRouter = function() {
  return this.router_;
};

/**
 * Render the soy template with the provided data.
 * @param {Function} template The template being rendered.
 * @param {Object=} opt_viewData The data being passed to the template.
 * @param {Element=} opt_element The element having the template rendered in.
 * Defaults to document.body.
 */
app.core.Response.prototype.render = function(template, opt_viewData,
                                              opt_element) {
  var element = opt_element || document.body;
  var data = opt_viewData || {};

  goog.soy.renderElement(element, template, data, this.request_.toJSON());
};
