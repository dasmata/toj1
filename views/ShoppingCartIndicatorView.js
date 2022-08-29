"use strict";

class ShoppingCartIndicatorView extends Observer.Client(View) {
    constructor(sc) {
        super(document.querySelector('.sc-data'))
        sc.attach(this)
        this.sc = sc;
    }

    render() {
        this.el.querySelector('.sc-data-products').textContent = this.sc.size();
    }
    notify(evt) {
        console.log(evt)
        this.render()
    }
}


