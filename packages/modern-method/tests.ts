import { Tinytest } from 'meteor/tinytest';
import { ModernMethod } from 'meteor/williamkelley:modern-method';

Tinytest.add('can be constructed', function (test) {
  const result = new ModernMethod('foo');

  test.instanceOf(result, ModernMethod);
});
