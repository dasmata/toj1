function PPromotion (data) {
    Promotion.prototype.constructor.call(this, data)
}

Object.setPrototypeOf(PPromotion.prototype, Promotion.prototype)

PPromotion.prototype.apply = function (prod, sc) {
    return prod.getValue();
}
