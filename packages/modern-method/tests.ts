import { Meteor } from 'meteor/meteor';
import { Tinytest } from 'meteor/tinytest';
import { ModernMethod } from 'meteor/williamkelley:modern-method';

const emptyFn = () => {
  return;
};

const _MeteorStartup = Meteor.startup;
const disableMeteorStartup = () => {
  Meteor.startup = emptyFn;
};
const enableMeteorStartup = () => {
  Meteor.startup = _MeteorStartup;
};

Tinytest.add('can be constructed', function (test) {
  disableMeteorStartup();
  const result = new ModernMethod('foo');

  test.instanceOf(result, ModernMethod);

  enableMeteorStartup();
});

Tinytest.add('can set an isomorphic handler', function (test) {
  disableMeteorStartup();
  const handler = emptyFn;
  const result = new ModernMethod('foo').setHandler(handler);

  if (Meteor.isClient) {
    // @ts-expect-error private property
    const handlerSet = result._handler;
    test.equal(handlerSet, handler);
  } else if (Meteor.isServer) {
    // @ts-expect-error private property
    const handlerSet = result._handler;
    test.equal(handlerSet, handler);
  }

  enableMeteorStartup();
});
