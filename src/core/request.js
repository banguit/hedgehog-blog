goog.provide('app.core.Request');

goog.require('goog.Uri');

/**
 * Create a simple request object based on the provided URL.
 * @param {Object} routeData Object that contains information about current
 *    route.
 * @param {string} uri The uri we are constructing this object from.
 * @param {string} queryVals The values for query path.
 * @param {boolean=} opt_ignoreCase Whether or not we are performing a case
 * sensitive parse.
 * @constructor
 * @extends {goog.Uri}
 */
app.core.Request = function(routeData, uri, queryVals, opt_ignoreCase) {
  goog.Uri.call(this, uri, opt_ignoreCase);

  /**
   * @type {Object}
   * @private
   */
  this.routeData_ = routeData;

  this.setQueryData(queryVals, false);
};
goog.inherits(app.core.Request, goog.Uri);

/**
 * Return route data by key or all values as object
 * @param {string=} opt_key
 * @return {Object|string}
 */
app.core.Request.prototype.getRouteData = function(opt_key) {
  if (goog.isDefAndNotNull(opt_key)) {
    return this.routeData_[opt_key];
  }
  return this.routeData_;
};

/**
 * Convert this object to a simple JSON object.
 * @return {Object}
 * @override
 */
app.core.Request.prototype.toJSON = function() {
  var obj = {
    domain: this.getDomain(),
    path: this.getPath(),
    port: this.getPort(),
    query: this.getQuery(),
    scheme: this.getScheme(),
    userInfo: this.getUserInfo(),
    routeData: this.routeData_,
    queryData: {}
  };
  var queryData = this.getQueryData();
  var keys = queryData.getKeys();

  for (var a = 0; a < keys.length; a++) {
    var values = queryData.getValues(keys[a]);

    if (values.length > 1) {
      obj.queryData[keys[a]] = values;
    } else {
      obj.queryData[keys[a]] = queryData.get(keys[a]);
    }
  }

  return obj;
};
