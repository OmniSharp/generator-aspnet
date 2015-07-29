'use strict';
var util = require('./test-utility');

/*
 * Check that namespace is normalized.
 */
describe('compat - namespace normalization', function() {
  util.goCreateApplication('classlib', 'name-test');
  util.fileContentCheck('name-test/Class1.cs', 'namespace normalized', /^namespace name_test$/m);
});
