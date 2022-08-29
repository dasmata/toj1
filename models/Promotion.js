"use strict";

class Promotion {
  constructor(data){
    Object.keys(data).forEach(key => this[key] = data[key]);
  }
}

Promotion.create = (function() {
  const instances = {};

  return function(data) {
    const map = {
      NX: NXPromotion,
      P: PPromotion
    }
    const processedData = {...data};
    if(data.type === 'P'){
      processedData.pair = processedData.pair.map(productSku => Product.get(productSku));
    }

    return instances[data.id] || (instances[data.id] = new map[data.type](processedData))
  }
})();


