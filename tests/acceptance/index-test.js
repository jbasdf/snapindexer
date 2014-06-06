import startApp from '../helpers/start-app';

var App;

module('Integration - Index', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy'); //comment this out to see the app in the state once the test it finished
  }
});

test('Home page loads search form', function(){
  visit('/');
  andThen(function(){
    equal(find('form.home-search').length, 1, 'The home page should have a search form');
  });
});

// test('Enter search term', function() {
//   visit('/');
//   fillIn('input#search', 'Bikes');
//   click('button[type="submit"]');

//   andThen(function() {
//     equal(find('#results').length, 1);
//   });
// });