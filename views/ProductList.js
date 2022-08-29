"use strict"

class ProductList extends View {
  constructor(el){
    super(el || document.createElement('ul'));

    this.el.classList.add('products-list');
    const products = new Set();
    Object.defineProperty(this, 'products', {
      configurable: false,
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

  addProducts(view){
    const views = Array.isArray(view) ? view :  [view];
    views.forEach(el => {
      this.products.add(el);
    });
    this.render()
  }

  render() {
    this.detach();
    this.products.forEach(el => {
      el.render();
      el.attach(this.el)
    });
    this.attach()
  }
}

