import esClient from '../helpers/elasticsearch_client';

export default Ember.Route.extend({

  query: '',

  model: function(params){

    var options = params.options.split('/');
    var query = this.query = options[0];

    //
    // Search everything
    //
    // return esClient.search({
    //   index: 'products',
    //   q: query
    // });

    //
    // Search just names
    //
    // return esClient.search({
    //   index: 'products',
    //   q: 'name:' + query
    // });

    //
    // Specify fields to match against
    //
    var body = {
      query: {
        match: {
          name: query,
          description: query
        }
      }
    };

    // Facet query
    var numberFacets = 20;
    body = {
      query: {
        match: {
          name: query
        }
      },
      facets: {
        category: {
          terms: {
            field: 'category',
            size: numberFacets
          }
        },
        // subcategory: {
        //   terms: {
        //     field: 'subcategory',
        //     size: numberFacets
        //   },
        // },
        merchant_name: {
          terms: {
            field: 'merchant_name',
            size: numberFacets
          },
        },
        brand_name: {
          terms: {
            field: 'brand_name',
            size: numberFacets
          },
        }

      }
    };


    //
    // Facet filters
    //
    var filter = {};

    if(options.length > 2 && options[2].length > 0){
      filter['and'] = [];
      for(var i = 2;i<options.length; i++){
        var parts = options[i].split(':');
        var term = {};
        term[parts[0]] = parts[1];
        filter['and'].push({term: term });
      }
    }

    body = {
      query: {
        filtered: {
          query: {
            //term: { name : query }, // Just search the name
            term: { _all : query } // Search all fields
          },
          filter: filter
        }
      },
      facets: {
        category: {
          terms: {
            field: 'category',
            size: numberFacets
          }
        },
        merchant_name: {
          terms: {
            field: 'merchant_name',
            size: numberFacets,
            order: "term"
          },
        },
        brand_name: {
          terms: {
            field: 'brand_name',
            size: numberFacets,
            order: "term"
          },
        }

      }
    };

    //
    // Sorting
    //
    var sort = [];
    if(options.length > 1){
      switch(options[1]){
        case 'discount':
          sort.push("percent_discount:desc");
          break;
        case 'price_desc':
          sort.push("current_price:desc");
          break;
        case 'price_asc':
          sort.push("current_price:asc");
          break;
      }
    }
    sort.push('_score');

    var perPage = 20;
    var pageNum = 1;

    return esClient.search({
      index: 'products',
      from: (pageNum - 1) * perPage,
      size: perPage,
      sort: sort.join(','),
      body: body
    });

  },

  setupController: function(controller, model){
    this._super(controller, model);
    controller.set('currentQuery', this.query);
  }

});