"use strict";

function QuantityDialog() {
    View.apply(this, [document.getElementById('quantity-dialog')]);
    this.setEvents()
}
Object.setPrototypeOf(QuantityDialog.prototype, View.prototype);
QuantityDialog.prototype.render = function() {
    this.el.showModal()
}
QuantityDialog.prototype.setEvents = function() {
    this.addEventListener('#quantity', 'change', (e) => {
        this.el.getElementsByClassName('ok-button')[0].value = e.target.value;
    });
    this.addEventListener('close', () => {
        const customEvent = new CustomEvent('quantityChange', {
            bubbles: true,
            detail: this.el.returnValue
        });
        this.el.dispatchEvent(customEvent);
    })
}


