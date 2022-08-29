"use strict"
function Product(data) {
  throw new Error('Always use Product.create');
}


(function() {
  function PrivateProduct(data) {
    this.setData(data)
  }
  Object.setPrototypeOf(PrivateProduct.prototype, Product.prototype);
  PrivateProduct.prototype.constructor = Product.prototype.constructor;

  PrivateProduct.prototype.setData = function(data) {
    Object.keys(data).forEach(key => this[key] = data[key])
  };

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