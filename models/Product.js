"use strict"

class Product { }


(function() {
  class PrivateProduct extends Product{
    constructor(data) {
      super();
      this.setData(data);
    }

    setData (data) {
      Object.keys(data).forEach(key => this[key] = data[key])
    }
  }

  const instances = {};

  Product.create = function(data){
    const instance = instances[data.sku] || (instances[data.sku] = new PrivateProduct(data));
    instance.setData(data);
    return instance;
  };

  Product.get = function(sku){
    return instances[sku] || Product.create({ sku })
  }
})();
