import esClient from '../helpers/elasticsearch_client';

export default Ember.Route.extend({

  model: function(params){

    return esClient.get({
      index: 'products',
      id: params.id
    });

  }

});