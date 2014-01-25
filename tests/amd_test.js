'use strict';

var requirejs = require('requirejs');

requirejs.config({
  baseUrl: __dirname + '/..'
});

exports['AMD compatibility'] = {

  default: function (test) {
    requirejs(['urlbuilder'], function (urlbuilder) {
      test.equal(typeof urlbuilder, 'function');
      test.done();
    });
  }

};
