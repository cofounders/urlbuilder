(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'));
  } else {
    root.urlbuilder = factory(root._);
  }
}(this, function (_) {

  var urlbuilder = function (url, fields, data, options) {

    if (!_.isString(url)) {
      url = '';
    }

    var config = _.extend({
      slug: /:(\w+)/g,
      separator: '+'
    }, options);

    var endpoint = url.replace(config.slug, function (match, name) {
      var param = fields[name];
      return _.isArray(param) ? _.map(param, encodeURIComponent)
          .join(config.separator)
        : _.isFunction(param) ? encodeURIComponent(param(name, fields))
        : encodeURIComponent(param);
    });

    var query = '';
    if (data && _.keys(data).length > 0) {
      query += endpoint.indexOf('?') === -1 ? '?' : '&';
      query += _.chain(data)
        .pairs()
        .map(function (pair) {
          var name = pair[0];
          var value = pair[1];
          return encodeURIComponent(name) +
            '=' + encodeURIComponent(value);
        })
        .value()
        .join('&');
    }

    return endpoint + query;
  };

  return urlbuilder;
}));
