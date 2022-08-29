function NXPromotion (data) {
    Promotion.prototype.constructor.call(this, data)
}

Object.setPrototypeOf(NXPromotion.prototype, Promotion.prototype)

NXPromotion.prototype.apply = function (prod, sc) {
    if(prod.quantity >= this.threshold){
        return parseFloat((prod.getValue() * ((100 - this.discount) / 100)).toFixed(2))
    }
    return prod.getValue();
}
