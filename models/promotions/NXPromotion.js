class NXPromotion extends Promotion {
    constructor(data){
        super(data)
    }

    apply(prod, sc){
        if(prod.quantity >= this.threshold){
            return parseFloat((prod.getValue() * ((100 - this.discount) / 100)).toFixed(2))
        }
        return prod.getValue();
    }
}
