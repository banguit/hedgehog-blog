/**
 * @fileoverview Main file to initialize application.
 * @author Dmytro Antonenko <dmitry.antonenko@pubwebkit.com>
 */

goog.provide('app');

goog.require('app.Core');


/**
 * Cross-browser wrapper for DOMContentLoaded.
 * @param {Window} win Window reference
 * @param {Function} fn Callback function reference
 */
app.loader = function(win, fn) {
  var done = false;
  var top = true;
  var doc = win.document;
  var root = doc.documentElement;
  var modern = doc.addEventListener;
  var add = modern ? 'addEventListener' : 'attachEvent';
  var rem = modern ? 'removeEventListener' : 'detachEvent';
  var pre = modern ? '' : 'on';

  /**
   * Content loader handler.
   * @param {Event|string} e
   */
  function init(e) {
    if (e.type === 'readystatechange' && doc.readyState !== 'complete') {
      return;
    }
    // remove listener, no longer needed
    (e.type === 'load' ? win : doc)[rem](pre + e.type, init, false);

    if (!done && (done = true)) {
      fn.call(win, e.type || e);
    }
  }

  /**
   * Recursive function to check content loading for legacy IE browser.
   */
  function poll() {
    try {
      root.doScroll('left');
    } catch (e) {
      setTimeout(poll, 50);
      return;
    }
    init('poll');
  }

  if (doc.readyState === 'complete') {
    fn.call(win, 'lazy');
  } else {
    if (!modern && root.doScroll) {
      try {
        top = !win.frameElement;
      } catch (e) {
      }

      if (top) {
        poll();
      }
    }
    doc[add](pre + 'DOMContentLoaded', init, false);
    doc[add](pre + 'readystatechange', init, false);
    win[add](pre + 'load', init, false);
  }
};

// Run application
app.loader(window, function() {
  new app.Core();
});
