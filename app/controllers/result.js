import esClient from '../helpers/elasticsearch_client';

export default Ember.ObjectController.extend({

  setPrices: function(){
    if(Ember.isEmpty(this.get('content'))){ return; }
    var high, low, current, high_at, low_at, current_at;
    var prices = [];
    high = low = current = this.get('sale_price');
    high_at = low_at = current_at = this.get('price_changed_at');
    if(this.get('sale_prices')){
      this.get('sale_prices').forEach(function(entry){
        var amount = entry['price'];
        prices.push(entry['created_at']);
        if(amount > high){
          high = amount;
          high_at = entry['created_at'];
        }
        if(amount < low){
          low = amount;
          low_at = entry['created_at'];
        }
      });
    }
    // this.set('high', high);
    // this.set('high_at', high_at);
    // this.set('low', low);
    // this.set('low_at', low_at);
    // this.set('current', current);
    // this.set('current_at', current_at);
    // this.set('prices', prices);
  }.observes('content')

});
