"use strict"
function ShoppingCartProduct() {
    throw new Error('Always use ShoppingCartProduct.create');
}


(function() {
    function PrivateShoppingCartProduct(product, quantity) {
        this.product = product;
        this.quantity = quantity;
    }
    Object.setPrototypeOf(PrivateShoppingCartProduct.prototype, ShoppingCartProduct.prototype);
    PrivateShoppingCartProduct.prototype.constructor = ShoppingCartProduct.prototype.constructor;

    PrivateShoppingCartProduct.prototype.getPrice = function(){
        return (this.quantity * (this.product.price * 100)) / 100
    }

    const instances = {};
    ShoppingCartProduct.create = function(product, quantity){
        const instance = instances[product.sku] || (instances[product.sku] = new PrivateShoppingCartProduct(product, 0));
        instance.quantity += quantity;
        return instance;
    };
})();
