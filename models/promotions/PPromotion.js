class PPromotion extends Promotion {
    constructor(data){
        super(data)
    }

    apply(prod, sc){
        return prod.getValue();
    }
}
