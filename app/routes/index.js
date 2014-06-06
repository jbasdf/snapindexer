export default Ember.Route.extend({

  activate: function(){
    Ember.$('body').addClass('home');
  },

  deactivate: function(){
    Ember.$('body').removeClass('home');
  }

});