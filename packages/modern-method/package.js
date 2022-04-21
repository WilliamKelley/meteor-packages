Package.describe({
  name: 'williamkelley:modern-method',
  version: '0.0.1',
  summary: 'Define Meteor Methods in a modern way.',
  git: 'https://github.com/WilliamKelley/meteor-packages.git',
  documentation: './README.md',
});

Package.onUse(function (api) {
  api.versionsFrom('2.7.1');
  api.use('typescript');
  api.mainModule('main.ts');
});

Package.onTest(function (api) {
  api.use('typescript');
  api.use('tinytest');
  api.use('williamkelley:modern-method');
  api.mainModule('tests.ts');
});
