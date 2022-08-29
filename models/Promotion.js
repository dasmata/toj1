"use strict";

function Promotion() {
  throw new Error('Always use Promotion.create');
}

Promotion.create = (function() {
  function PrivatePromotion(data) {
    Object.keys(data).forEach(key => this[key] = data[key]);
  }
  Object.setPrototypeOf(PrivatePromotion.prototype, Promotion.prototype);
  PrivatePromotion.prototype.constructor = Promotion.prototype.constructor;

  const instances = {};

  return function(data) {
    const processedData = {...data};
    if(data.type === 'P'){
      processedData.pair = processedData.pair.map(productSku => Product.get(productSku));
    }

    return instances[data.id] || (instances[data.id] = new PrivatePromotion(processedData))
  }
})();


