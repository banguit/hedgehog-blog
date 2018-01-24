/**
 * @fileoverview The action filter is a class with specific events that you can
 * apply to a controller action or an entire controller that modifies the way
 * in which the action is executed.
 */

goog.provide('app.core.ActionFilter');

/**
 * Action filter interface. Should be inherited by each action filter.
 * @interface
 */
app.core.ActionFilter = function() {};

/**
 * Called when an unhandled exception occurs in the action.
 * @param {app.core.events.ActionExceptionEvent} event
 */
app.core.ActionFilter.prototype.onException = goog.nullFunction;

/**
 * Called before the action method is invoked.
 * @param {app.core.events.ActionEvent} event
 */
app.core.ActionFilter.prototype.onActionExecuting = goog.nullFunction;

/**
 * Called after the action method is invoked.
 * @param {app.core.events.ActionEvent} event
 */
app.core.ActionFilter.prototype.onActionExecuted = goog.nullFunction;
