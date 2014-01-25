'use strict';

exports['CommonJS compatibility'] = {

  default: function (test) {
    test.equal(typeof require('../urlbuilder'), 'function');
    test.done();
  }

};
