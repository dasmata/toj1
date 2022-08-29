"use strict";
class ShoppingCart { }

(function () {
    class PrivateShoppingCart extends Observer.Target(ShoppingCart) {
        constructor() {
            super();
            this.products = new Set();
        }

        addProduct (product) {
            if(! (product instanceof ShoppingCartProduct)) {
                throw new Error(`Expecting an instance of ShoppingCartProduct. ${product.constructor.name} given`)
            }
            this.products.add(product)
            this.notify('cartChanged')
        }

        size () {
            return Array.from(this.products).reduce((acc, product) => {
                return acc + product.quantity
            }, 0)
        }
    }

    const instance = new PrivateShoppingCart();
    ShoppingCart.getInstance = function () {
        return instance;
    };
})();
