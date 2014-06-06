import startApp from '../helpers/start-app';

var App;

module('Integration - Results', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy'); //comment this out to see the app in the state once the test it finished
  }
});

test('Visit url with query populated', function() {
  visit('/results/bike');
  andThen(function() {
    equal(find('#results').length, 1);
  });
});