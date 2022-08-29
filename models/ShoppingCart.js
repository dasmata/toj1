"use strict";
function ShoppingCart(){
    throw new Error('Always use ShoppingCart.getInstance()');
}

(function () {
    function PrivateShoppingCart(){
        Observer.Target.prototype.constructor.call(this)
        this.products = new Set();
    }
    Object.setPrototypeOf(PrivateShoppingCart.prototype, ShoppingCart.prototype);
    Object.setPrototypeOf(PrivateShoppingCart.prototype, Observer.Target.prototype);
    PrivateShoppingCart.prototype.constructor = ShoppingCart.prototype.constructor;

    PrivateShoppingCart.prototype.addProduct = function (product) {
        if(! (product instanceof ShoppingCartProduct)) {
            throw new Error(`Expecting an instance of ShoppingCartProduct. ${product.constructor.name} given`)
        }
        this.products.add(product)
        this.notify('cartChanged')
    }

    PrivateShoppingCart.prototype.size = function() {
        return Array.from(this.products).reduce((acc, product) => {
            return acc + product.quantity
        }, 0)
    }

    PrivateShoppingCart.prototype.getValue = function() {
        return Array.from(this.products).reduce((acc, scProduct) => {
            if(scProduct.product.promotion) {
                return ((acc * 100) + (scProduct.product.promotion.apply(scProduct, this) * 100)) / 100;
            }
            return (acc * 100 + scProduct.getValue() * 100) / 100;
        }, 0)
    }

    const instance = new PrivateShoppingCart();
    ShoppingCart.getInstance = function () {
        return instance;
    };
})();
