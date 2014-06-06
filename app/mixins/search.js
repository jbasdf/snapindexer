export default Ember.Mixin.create({

  query: '',

  actions: {
    search: function(){
      this.transitionToRoute('results', this.get('query'));
    }
  }

});