"use strict";

class Promotion {}

Promotion.create = (function() {
  class PrivatePromotion extends Promotion {
    constructor(data){
      super();
      Object.keys(data).forEach(key => this[key] = data[key]);
    }
  }

  const instances = {};

  return function(data) {
    const processedData = {...data};
    if(data.type === 'P'){
      processedData.pair = processedData.pair.map(productSku => Product.get(productSku));
    }

    return instances[data.id] || (instances[data.id] = new PrivatePromotion(processedData))
  }
})();


