'use strict';
var util = require('./test-utility');

/*
 * Check that namespace is normalized.
 */
describe('compat - namespace normalization', function() {
  util.goCreateApplication('classlibrary', 'name-test');
  util.fileContentCheck('name-test/Class1.cs', 'namespace normalized', /^namespace name_test$/m);
});
