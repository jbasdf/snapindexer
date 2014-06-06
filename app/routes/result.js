import esClient from '../helpers/elasticsearch_client';

export default Ember.Route.extend({

  model: function(params){

    var product = Ember.ObjectProxy.create();
    esClient.get({
      index: 'products',
      type: 'product',
      id: params.id
    }).then(function(response){
      var content = response._source;
      content.id = response._id;
      content.recommendations = Ember.ArrayProxy.create();
      product.set('content', content);

      esClient.mlt({
        index: 'products',
        type: 'product',
        id: params.id,
        mlt_fields: 'name,keywords,description',
        min_doc_freq: 2,
        percent_terms_to_match: 0.1
      }).then(function(response){
        var hits = response.hits.hits.map(function(hit){
          var h = hit._source;
          h.id = hit._id;
          return h;
        });
        content.recommendations.set('content', hits);
      });
    });
    return product;
  }

});

