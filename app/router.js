var Router = Ember.Router.extend({
  location: ENV.locationType
});

Router.map(function(){
  this.resource('results', { path: '/results/*options' }, function(){});
  this.resource('result', {path: '/result/:id'}, function(){});
});

export default Router;