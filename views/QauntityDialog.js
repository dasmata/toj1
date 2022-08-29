"use strict";

class QuantityDialog extends View {
    constructor(){
       super(document.getElementById('quantity-dialog'))
        this.setEvents()
    }

    render() {
        this.el.showModal()
    }
    setEvents() {
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
}
