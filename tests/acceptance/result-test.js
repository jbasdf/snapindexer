// import startApp from '../helpers/start-app';
// import theBikeResponse from '../fixtures/thebike.json';

// var ajax = require('ic-ajax');

// ajax.defineFixture('/fixtures/thebike.json', {
//   response: theBikeResponse,
//   jqXHR: {},
//   textStatus: 'success'
// });

// var App;

// module('Integration - Result', {
//   setup: function() {
//     App = startApp();
//   },
//   teardown: function() {
//     Ember.run(App, 'destroy'); //comment this out to see the app in the state once the test it finished
//   }
// });

// test('Visit result page', function() {
//   visit('/result/bike');
//   andThen(function() {
//     equal(find('#results').length, 1);
//   });
// });