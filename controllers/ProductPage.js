"use strict";

function ProductPage(products, promotions) {
    this.promotions = promotions.map(el => Promotion.create(el))
    this.products = products.map(el => {
        const processedData = {
            ...el,
            promotion: el.promotion ? this.promotions.find(promo => promo.id === el.promotion) : null
        };
        return Product.create(processedData)
    })
    this.listView = null;
    this.productViews = null;
    this.dialog = null;
}

ProductPage.prototype.init = function(){
    this.listView = new ProductList();
    this.productViews = this.products.map((product) => new ProductView(product));
    this.dialog = new QuantityDialog()
    this.scIndicator = new ShoppingCartIndicatorView(ShoppingCart.getInstance())

    this.listView.attach(document.querySelector('main'));
    this.listView.addProducts(this.productViews)
    this.initListeners();
}

ProductPage.prototype.initListeners = function(){
    this.listView.addEventListener('addToCart', (evt) => {
        const callback = (e) => {
            const value = parseInt(e.detail)
            if(value > 0 && !isNaN(value)){
                const scProduct = ShoppingCartProduct.create(evt.detail, value);
                ShoppingCart.getInstance().addProduct(scProduct)
            }
            this.dialog.removeEventListener('quantityChange', callback);
            console.log(ShoppingCart.getInstance().getValue())
        }
        this.dialog.render();
        this.dialog.addEventListener('quantityChange', callback);
    });
}
