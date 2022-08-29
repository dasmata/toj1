"use strict"
class ShoppingCartProduct { }


(function() {
    class PrivateShoppingCartProduct extends ShoppingCartProduct {
        constructor(product, quantity) {
            super();
            this.product = product;
            this.quantity = quantity;
        }

        getValue() {
            return (this.quantity * (this.product.price * 100)) / 100
        }
    }

    const instances = {};
    ShoppingCartProduct.create = function(product, quantity){
        const instance = instances[product.sku] || (instances[product.sku] = new PrivateShoppingCartProduct(product, 0));
        instance.quantity += quantity;
        return instance;
    };
})();
