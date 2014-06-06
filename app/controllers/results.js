export default Ember.ObjectController.extend({

  currentFacets: Ember.A(),
  currentQuery: '',

  actions: {
    facet: function(facet, term){
      var facets = this.get('currentFacets');
      if(!facets.contains(term)){
        facets.pushObject(facet.facet + ':' + term);
      }
      this.forceTransition();
    }
  },

  hits: function(){
    return this.get('content.hits.hits').map(function(item){
      var data = item._source;
      data.id = item._id;
      return data;
    }.bind(this));
  }.property('content'),

  facets: function(){
    var mapped = Ember.A();
    var facets = this.get('content.facets');
    for(var facet in facets){
      mapped.pushObject({
        facet: facet,
        name: facet.replace('_', ' '),
        terms: facets[facet].terms
      });
    }
    return mapped;
  }.property('content'),

  sortByDidChange: function(){
    if(!Ember.isEmpty(this.get('sortBy.value'))){
      this.forceTransition();
    }
  }.observes('sortBy'),

  sortOptions: function(){
    return [
      { value: "discount",   label: "% Off" },
      { value: "price_desc", label: "Price High - Low" },
      { value: "price_asc",  label: "Price Low - High" },
      { value: "best",       label: "Best Match" }
    ];
  }.property(),

  forceTransition: function(){
    var sortBy = this.get('sortBy.value') || '_score';
    var facets = this.get('currentFacets');
    this.transitionToRoute('/results/' + this.get('currentQuery') + '/' + sortBy + '/' + facets.join('/'));
  }

});
