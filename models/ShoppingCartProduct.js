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
            return Array.from(this.products).reduce((acc, scProduct) => {
                if(scProduct.product.promotion) {
                    return ((acc * 100) + (scProduct.product.promotion.apply(scProduct, this) * 100)) / 100;
                }
                return (acc * 100 + scProduct.getValue() * 100) / 100;
            }, 0)
        }
    }

    const instances = {};
    ShoppingCartProduct.create = function(product, quantity){
        const instance = instances[product.sku] || (instances[product.sku] = new PrivateShoppingCartProduct(product, 0));
        instance.quantity += quantity;
        return instance;
    };
})();
