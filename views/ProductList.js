"use strict"

function ProductList(el) {
  View.apply(this, [el || document.createElement('ul')]);
  this.el.classList.add('products-list');
  const products = new Set();
  Object.defineProperty(this, 'products', {
    configrable: false,
    enumerable: false,
    writable: false,
    value: {
      add: products.add.bind(products),
      clear: products.clear.bind(products),
      delete: products.delete.bind(products),
      forEach: products.forEach.bind(products),
      size: () => products.size
    }
  })
}
Object.setPrototypeOf(ProductList.prototype, View.prototype);

ProductList.prototype.addProducts = function(view){
  const views = Array.isArray(view) ? view :  [view];
  views.forEach(el => {
    this.products.add(el);
  });
  this.render()
};

ProductList.prototype.render = function() {
  this.detach();
  this.products.forEach(el => {
    el.render();
    el.attach(this.el)
  });
  this.attach()
};

