"use strict"

const templateGenerator = () => [
  {
    el: (() => {
      const img = document.createElement('img');
      img.src = 'images/noimage.jpg';
      img.width = 200;
      return img;
    })()
  },
  {
    el: (() => {
      const productDetails = document.createElement('div');
      productDetails.classList.add('product-details');
      return productDetails;
    })(),
    children: [
      {
        el: (() => {
          const productData = document.createElement('div');
          productData.classList.add('product-data');
          return productData;
        })(),
        children: [
          {
            el: (() => {
              const holder = document.createElement('div')
              holder.classList.add('title-wrapper')
              return holder;
            })(),
            children: [
              {
                el: document.createElement('h3')
              },
              {
                el: (() => {
                  const promo = document.createElement('span');
                  promo.classList.add('promo')
                  promo.classList.add('hidden')
                  promo.textContent = 'promo'
                  return promo;
                })()
              }
            ]
          },
          {
            el: document.createElement('p')
          }
        ]
      },
      {
        el: (() => {
          const cart = document.createElement('div');
          cart.classList.add('cart-details');
          return cart;
        })(),
        children: [
          {
            el: (() => {
              const price = document.createElement('div');
              price.classList.add('price');
              return price;
            })(),
            children: [
              {
                el: (() => {
                  const value = document.createElement('span');
                  value.classList.add('value');
                  return value;
                })(),
                children: [{el: document.createElement('span')}, {el: document.createElement('span')}]
              },
              { el: (() => {
                const currency = document.createElement('span');
                currency.classList.add('currency');
                return currency;
              })() }
            ]
          },
          {
            el: (() => {
              const btn = document.createElement('button');
              btn.textContent = 'Add to cart';
              return btn;
            })()
          }
        ]
      }
    ]
  }
];

function ProductView(productData) {
  const el = document.createElement('li');
  View.apply(this, [el]);
  el.classList.add('product');
  this.product = productData;
  this.setEventListeners();
}
Object.setPrototypeOf(ProductView.prototype, View.prototype);


ProductView.prototype.setEventListeners = function(){
  this.addEventListener('.cart-details button', 'click', e => {
    const customEvent = new CustomEvent('addToCart', {
      bubbles: true,
      detail: this.product
    });
    this.el.dispatchEvent(customEvent);
  });
}

ProductView.prototype.render = function(){
  this.el.setAttribute('data-sku', this.product.sku);
  this.el.querySelector('h3').textContent = this.product.name;
  this.el.querySelector('p').textContent = this.product.description;
  this.el.querySelector('.currency').textContent = this.product.currency;
  this.el.querySelector('.value span:first-child').textContent = Math.floor(this.product.price);
  this.el.querySelector('.value span:last-child').textContent = (this.product.price * 100) % 100;
  if (this.product.promotion) {
    const promo = this.el.querySelector('.promo');
    promo.title = this.product.promotion.name;
    promo.classList.remove('hidden')
  }
};
ProductView.template = new DocumentFragment();
View.generateTemplate(templateGenerator(), ProductView.template);
