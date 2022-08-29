"use strict";

function ShoppingCartIndicatorView(sc) {
    View.apply(this, [document.querySelector('.sc-data')]);
    sc.attach(this)
    this.sc = sc;
}
Object.setPrototypeOf(ShoppingCartIndicatorView.prototype, View.prototype);
Object.setPrototypeOf(ShoppingCartIndicatorView.prototype, Observer.Client.prototype);

ShoppingCartIndicatorView.prototype.render = function() {
    this.el.querySelector('.sc-data-products').textContent = this.sc.size();
}
ShoppingCartIndicatorView.prototype.notify = function(evt) {
    console.log(evt)
    this.render()
}
