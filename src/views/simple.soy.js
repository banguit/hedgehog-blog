// This file was automatically generated from simple.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace app.views.
 * @public
 */

goog.provide('app.views');

goog.require('soy');
goog.require('soydata');


/**
 * @param {Object<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
app.views.hello = function(opt_data, opt_ignored) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('Hello from ' + soy.$$escapeHtml(opt_data.controller) + '!');
};
if (goog.DEBUG) {
  app.views.hello.soyTemplateName = 'app.views.hello';
}
