//import es from "vendor/elasticsearch/elasticsearch";

export default Ember.Route.extend({

  model: function(){

    var client = new elasticsearch.Client({
      host: 'localhost:9200',
      log: 'trace'
    });

    return client.search({
      q: '*'
    });

    // .then(function (body) {
    //   var hits = body.hits.hits;
    // }, function (error) {
    //   console.trace(error.message);
    // });

  }

});